import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';
import { Role } from 'src/modules/roles/entities/role.entity';
import * as bcrypt from 'bcrypt';
import { Organization } from 'src/modules/organization/entities/organization.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Person } from 'src/modules/person/entities/person.entity';
import { CreatePersonDto, UpdatePersonDto } from 'src/modules/person/dto';
import { Group } from 'src/modules/group/entities/group.entity';
import { Sequelize } from 'sequelize-typescript';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';
import { AppError } from 'src/common/constants/error';
import { Op, QueryTypes } from 'sequelize';
import { StatusUserResponse, UserResponse } from './response';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(Person) private personRepository: typeof Person,
    private readonly historyService: TransactionHistoryService,
    private sequelize: Sequelize,
  ) { }

  async create(user: CreateUserDto): Promise<UserResponse> {
    try {
      const transaction = await this.sequelize.transaction();

      const email = user.email.toLowerCase();
      user.email = email;
      user.password = await bcrypt.hash(user.password, 10);

      const createPersonDto = new CreatePersonDto();
      createPersonDto.last_name = user.last_name;
      createPersonDto.first_name = user.first_name;
      createPersonDto.patronymic = user.patronymic;
      createPersonDto.gender_id = user.gender_id;
      createPersonDto.phone = user.phone;
      createPersonDto.person_status_id = 3; // На подтверждении

      const newPerson = await this.personRepository.create(
        { ...createPersonDto },
        { transaction: transaction },
      );

      user.person_id = newPerson.person_id;
      const newUser = await this.userRepository
        .create({ ...user }, { transaction: transaction })
        .catch((error) => {
          let errorMessage = error.message;
          let errorCode = HttpStatus.BAD_REQUEST;
          if (error.original.code === '23505') {
            errorMessage = AppError.USER_EMAIL_EXISTS;
            errorCode = HttpStatus.CONFLICT;
          }

          throw new HttpException(errorMessage, errorCode);
        });

      await transaction.commit();

      const historyDto = {
        user_id: newUser.user_id,
        comment: `Создан пользователь #${newUser.user_id} (person_id: ${newUser.person_id})`,
      };
      await this.historyService.create(historyDto);

      return {
        user_id: newUser.user_id,
        ...user,
        person_status_id: createPersonDto.person_status_id,
        approved: false,
      };
    } catch (error) {
      if (error.code === 409) {
        throw new Error(error.message);
      } else {
        throw new Error(error);
      }
    }
  }

  async update(
    updatedUser: UpdateUserDto,
    user_id: number,
  ): Promise<UserResponse> {
    try {
      const transaction = await this.sequelize.transaction();

      if (updatedUser.email != undefined) {
        const email = updatedUser.email.toLowerCase();
        updatedUser.email = email;
      }

      if (updatedUser.password != undefined) {
        updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
      }

      const user = await this.findById(updatedUser.user_id);
      const person_id = user.person.person_id;
      const foundPerson = await this.personRepository.findOne({
        where: { person_id },
      });
      if (foundPerson == null) {
        await transaction.rollback();
        throw new HttpException(
          AppError.PERSON_NOT_FOUND,
          HttpStatus.BAD_REQUEST,
        );
      }

      const updatePersonDto = new UpdatePersonDto();
      updatePersonDto.last_name = updatedUser.last_name;
      updatePersonDto.first_name = updatedUser.first_name;
      updatePersonDto.patronymic = updatedUser.patronymic;
      updatePersonDto.gender_id = updatedUser.gender_id;
      updatePersonDto.phone = updatedUser.phone;
      updatePersonDto.person_status_id = updatedUser.person_status_id;

      await foundPerson.update(updatePersonDto, { transaction: transaction });

      let foundUser = null;
      await this.userRepository.update(
        { ...updatedUser },
        { where: { user_id: updatedUser.user_id }, transaction: transaction },
      );

      foundUser = await this.userRepository.findOne({
        where: { user_id: updatedUser.user_id },
      });

      if (foundUser) {
        const historyDto = {
          user_id: user_id,
          comment: `Изменен пользователь #${foundUser.user_id}`,
        };
        await this.historyService.create(historyDto);
      }

      await transaction.commit();

      return foundUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      // const foundUsers = await this.userRepository.findAll({
      //   include: [Role, Organization, Person, Group],
      //   attributes: {
      //     exclude: [
      //       'password',
      //       'organization_id',
      //       'role_id',
      //       'person_id',
      //       'group_id'
      //     ],
      //   },
      // });

      let order_by_user_id = `DESC`;
      const foundUsers = this.sequelize.query(
        `
        SELECT "User"."user_id",
               "User"."email",
               "User"."approved",
               "User"."createdAt",
               "User"."updatedAt",
               "role"."role_id" AS "role.role_id",
               "role"."role_name" AS "role.role_name",
               "role"."createdAt" AS "role.createdAt",
               "role"."updatedAt" AS "role.updatedAt",
               "organization"."organization_id" AS "organization.organization_id",
               "organization_type"."organization_type_id" AS "organization.organization_type.organization_type_id",
               "organization_type"."type_name" AS "organization.organization_type.type_name",
               "organization"."full_name" AS "organization.full_name",
               "organization"."short_name" AS "organization.short_name",
               "organization"."register_number" AS "organization.register_number",
               "organization"."bic" AS "organization.bic",
               "organization"."phone" AS "organization.phone",
               "organization"."address" AS "organization.address",
               "organization"."email" AS "organization.email",
               "organization"."ogrn" AS "organization.ogrn",
               "organization"."inn" AS "organization.inn",
               "organization"."kpp" AS "organization.kpp",
               "organization"."okpo" AS "organization.okpo",
               "organization"."property_values" AS "organization.property_values",
               "organization"."createdAt" AS "organization.createdAt", "organization"."updatedAt" AS "organization.updatedAt",
               "person"."person_id" AS "person.person_id",
               "person"."last_name" AS "person.last_name",
               "person"."first_name" AS "person.first_name",
               "person"."patronymic" AS "person.patronymic",
               "person"."gender_id" AS "person.gender_id",
               "gender"."gender_name" AS "person.gender",
               "person_status"."person_status_id" AS "person.person_status.person_status_id",
               "person_status"."person_status_name" AS "person.person_status.person_status_name",
               "person"."phone" AS "person.phone",
               "person"."property_values" AS "person.property_values",
               "person"."createdAt" AS "person.createdAt",
               "person"."updatedAt" AS "person.updatedAt",
               "group"."group_id" AS "group.group_id",
               "group"."group_name" AS "group.group_name",
               "group"."createdAt" AS "group.createdAt",
               "group"."updatedAt" AS "group.updatedAt"
               FROM "Users" AS "User"
               LEFT OUTER JOIN "Roles" AS "role"
               ON "User"."role_id" = "role"."role_id"
               LEFT OUTER JOIN "Organizations" AS "organization"
               ON "User"."organization_id" = "organization"."organization_id"
               LEFT OUTER JOIN "OrganizationTypes" AS "organization_type"
               ON "organization"."organization_type_id" = "organization_type"."organization_type_id"
               LEFT OUTER JOIN "People" AS "person"
               ON "User"."person_id" = "person"."person_id"
               LEFT OUTER JOIN "Groups" AS "group"
               ON "User"."group_id" = "group"."group_id"
               LEFT OUTER JOIN "Genders" AS "gender"
               ON "person"."gender_id" = "gender"."gender_id"
               LEFT OUTER JOIN "PersonStatuses" AS "person_status"
               ON "person_status"."person_status_id" = "person"."person_status_id"
               WHERE ((:user_id IS NULL) OR ("User".user_id = :user_id))
               ORDER BY user_id ${order_by_user_id}
               LIMIT :limit OFFSET :offset;
        `,
        {
          nest: true,
          type: QueryTypes.SELECT,
          replacements: {
            user_id: null, // value == undefined ? null : value
            limit: 50, // count
            offset: 0, // count * page - count
          },
        });
      return foundUsers;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(user_id: number): Promise<boolean> {
    try {
      const result = await this.userRepository.findOne({ where: { user_id } });

      if (result) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id: number) {
    const result = await this.userRepository.findOne({
      include: [Role, Organization, Person, Group],
      where: { user_id: id },
      attributes: {
        exclude: [
          'password',
          'organization_id',
          'role_id',
          'person_id',
          'group_id'
        ],
      },
    });

    if (result != null) {
      return result;
    } else {
      return Promise.reject({
        statusCode: HttpStatus.NOT_FOUND,
        message: AppError.USER_NOT_FOUND,
      });
    }
  }

  async findUser({
    user_id = -1,
    email = '',
  }: {
    user_id?: number;
    email?: string;
  }): Promise<boolean> {
    try {
      const foundUser = await this.userRepository.findOne({
        where: { [Op.or]: [{ user_id }, { email }] },
      });

      if (foundUser) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByEmail(email: string): Promise<any> {
    try {
      const result = await this.userRepository.findOne({
        include: [Person],
        where: { email },
        attributes: { exclude: ['person_id'] },
      });

      if (result != null) {
        // const userRoles = await this.rolePermissionRepository.findAll({
        //   where: { role_id: result.role_id },
        //   attributes: {
        //     exclude: [
        //       'role_permission_id',
        //       'role_id',
        //       'createdAt',
        //       'updatedAt',
        //     ],
        //   },
        // });
        // const permissions = [];
        // userRoles.forEach(element => {
        //     permissions.push(element.dataValues);
        // });

        return {
          user_id: result.user_id,
          email: result.email,
          password: result.password,
        };
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number, user_id: number): Promise<StatusUserResponse> {
    try {
      const transaction = await this.sequelize.transaction();

      const user = await this.userRepository.findOne({
        where: { user_id: id },
        attributes: { exclude: ['password'] },
      });

      const deleteUser = await this.userRepository.destroy({
        where: { user_id: id },
        transaction: transaction,
      });
      const deletePerson = await this.personRepository.destroy({
        where: { person_id: user.person_id },
        transaction: transaction,
      });

      if (deleteUser && deletePerson) {
        const historyDto = {
          user_id: user_id,
          comment: `Удален пользователь #${id}`,
        };
        await this.historyService.create(historyDto);

        await transaction.commit();

        return { status: true };
      }

      await transaction.rollback();
      return { status: false };
    } catch (error) {
      throw new Error(error);
    }
  }

  async approve(id: number, user_id: number): Promise<StatusUserResponse> {
    try {
      const transaction = await this.sequelize.transaction();

      await this.userRepository.update(
        { approved: true },
        { where: { user_id: id } },
      );

      const historyDto = {
        user_id: user_id,
        comment: `Пользователь #${id} подтвержден`,
      };
      await this.historyService.create(historyDto);

      await transaction.commit();

      return { status: true };
    } catch (error) {
      throw new Error(error);
    }
  }
}
