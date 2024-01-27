import { Injectable } from '@nestjs/common';
import { CreatePersonStatusDto, UpdatePersonStatusDto } from './dto';
import { PersonStatusResponse, StatusPersonStatusResponse } from './response';
import { InjectModel } from '@nestjs/sequelize';
import { PersonStatus } from './entities/person_status.entity';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';

@Injectable()
export class PersonStatusService {
  constructor(
    @InjectModel(PersonStatus) private personStatusRepository: typeof PersonStatus,
    private readonly historyService: TransactionHistoryService,
  ) { }

  async create(createPersonStatusDto: CreatePersonStatusDto, user_id: number): Promise<PersonStatusResponse> {
    try {
      const newPersonStatus = await this.personStatusRepository.create({ ...createPersonStatusDto });

      const historyDto = {
        "user_id": user_id,
        "comment": `Создан статус #${newPersonStatus.person_status_id}`,
      }
      await this.historyService.create(historyDto);

      return newPersonStatus;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<PersonStatusResponse[]> {
    try {
      const foundStatuses = await this.personStatusRepository.findAll();
      return foundStatuses;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(person_status_id: number): Promise<boolean> {
    try {
      const result = await this.personStatusRepository.findOne({ where: { person_status_id } });

      if (result) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(updatePersonStatusDto: UpdatePersonStatusDto, user_id: number): Promise<PersonStatusResponse> {
    try {
      let foundPersonStatus = null;
      await this.personStatusRepository.update({ ...updatePersonStatusDto }, { where: { person_status_id: updatePersonStatusDto.person_status_id } });

      foundPersonStatus = await this.personStatusRepository.findOne({ where: { person_status_id: updatePersonStatusDto.person_status_id } });

      if (foundPersonStatus) {
        const historyDto = {
          "user_id": user_id,
          "comment": `Изменен статус #${foundPersonStatus.category_id}`,
        }
        await this.historyService.create(historyDto);
      }

      return foundPersonStatus;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(person_status_id: number, user_id: number): Promise<StatusPersonStatusResponse> {
    try {
      const deleteCategory = await this.personStatusRepository.destroy({ where: { person_status_id } });

      if (deleteCategory) {
        const historyDto = {
          "user_id": user_id,
          "comment": `Удален статус #${person_status_id}`,
        }
        await this.historyService.create(historyDto);

        return { status: true };
      }

      return { status: false };
    } catch (error) {
      throw new Error(error);
    }
  }
}
