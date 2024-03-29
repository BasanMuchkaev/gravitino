import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';
import { RolesService } from '../roles/roles.service';
import { OrganizationService } from '../organization/organization.service';
import { GroupService } from '../group/group.service';
import { AppError } from 'src/common/constants/error';
import { PermissionsGuard } from '../auth/guards/permission.guard';
import { HasPermissions } from '../auth/guards/permissions.decorator';
import { PermissionEnum } from '../auth/guards/enums/permission.enum';
import { AllExceptionsFilter } from 'src/common/exception.filter';
import { PersonStatusService } from '../person_status/person_status.service';
import { GenderService } from '../gender/gender.service';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
@UseFilters(AllExceptionsFilter)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly roleService: RolesService,
    private readonly organizationService: OrganizationService,
    private readonly groupService: GroupService,
    private readonly personStatusService: PersonStatusService,
    private readonly genderService: GenderService,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 201, description: 'Пользователь успешно создан!' })
  @ApiResponse({
    status: 404,
    description: 'Запись отсутствует в базе данных!',
  })
  @ApiResponse({
    status: 409,
    description: 'Пользователь с таким логином уже существует!',
  })
  @ApiResponse({ status: 403, description: 'Forbidden!' })
  async create(@Body() user: CreateUserDto) {
    const foundUser = await this.usersService.findByEmail(user.email);
    if (!foundUser) {
      throw new HttpException(AppError.USER_EMAIL_EXISTS, HttpStatus.CONFLICT);
    }

    const foundRole = await this.roleService.findOne(user.role_id);
    if (!foundRole) {
      throw new HttpException(AppError.ROLE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const foundOrganization = await this.organizationService.findOne(user.organization_id);
    if (!foundOrganization) {
      throw new HttpException(AppError.ORGANIZATION_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const foundGender = await this.genderService.findOne(user.gender_id);
    if (!foundGender) {
      throw new HttpException(AppError.GENDER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    if (user.group_id) {
      const foundGroup = await this.groupService.findOne(user.group_id);
      if (!foundGroup) {
        throw new HttpException(AppError.GROUP_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
    }

    return this.usersService.create(user).catch((error) => {
      const errorMessage = error.message;

      throw new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({
    status: 200,
    description: 'Список всех пользователей',
    type: User,
  })
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Получение отдельного пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Найденная запись',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'Пользователь не найден!',
    type: User,
  })
  findById(@Param('id') id: number) {
    return this.usersService.findById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  @ApiOperation({ summary: 'Обновление данных пользователя' })
  @ApiResponse({ status: 200, description: 'Пользователь успешно обновлен!' })
  @ApiResponse({
    status: 404,
    description: 'Запись отсутствует в базе данных!',
  })
  @ApiResponse({
    status: 409,
    description: 'Пользователь с таким логином уже существует!',
  })
  @ApiResponse({ status: 403, description: 'Forbidden!' })
  async update(@Body() user: UpdateUserDto, @Req() request) {
    let foundUser = null;
    if (user.user_id) {
      foundUser = await this.usersService.findOne(user.user_id);
    }
    if (!foundUser) {
      throw new HttpException(AppError.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    if (user.role_id) {
      const foundRole = await this.roleService.findOne(user.role_id);
      if (!foundRole) {
        throw new HttpException(AppError.ROLE_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
    }

    if (user.organization_id) {
      const foundOrganization = await this.organizationService.findOne(user.organization_id);
      if (!foundOrganization) {
        throw new HttpException(AppError.ORGANIZATION_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
    }

    if (user.person_status_id) {
      const foundPersonStatus = await this.personStatusService.findOne(user.person_status_id);
      if (!foundPersonStatus) {
        throw new HttpException(AppError.PERSON_STATUS_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
    }

    if (user.gender_id) {
      const foundGender = await this.genderService.findOne(user.gender_id);
      if (!foundGender) {
        throw new HttpException(AppError.GENDER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
    }

    if (user.group_id) {
      const foundGroup = await this.groupService.findOne(user.group_id);
      if (!foundGroup) {
        throw new HttpException(AppError.GROUP_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
    }


    return this.usersService.update(user, request.user.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Удаление отдельного пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Пользователь успешно удален!',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'Пользователь не найден!',
    type: User,
  })
  async remove(@Param('id') id: number, @Req() request) {
    const foundUser = await this.usersService.findOne(id);
    if (foundUser == null) {
      throw new HttpException(AppError.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return this.usersService.remove(+id, request.user.user_id);
  }

  @HasPermissions(PermissionEnum.UserApprove)
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Patch('approve/:id')
  @ApiOperation({ summary: 'Подтверждение пользователя по ID' })
  async approve(@Param('id') id: number, @Req() request) {
    const foundUser = await this.usersService.findOne(id);
    if (foundUser == null) {
      throw new HttpException(AppError.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return this.usersService.approve(+id, request.user.user_id);
  }
}
