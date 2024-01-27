import { Injectable } from '@nestjs/common';
import { CreateGenderDto, UpdateGenderDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { Gender } from './entities/gender.entity';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';
import { GenderResponse, StatusGenderResponse } from './response';

@Injectable()
export class GenderService {
  constructor(
    @InjectModel(Gender) private genderRepository: typeof Gender,
    private readonly historyService: TransactionHistoryService,
  ) { }

  async create(createGenderDto: CreateGenderDto, user_id: number): Promise<GenderResponse> {
    try {
      const newGender = await this.genderRepository.create({ ...createGenderDto });

      const historyDto = {
        "user_id": user_id,
        "comment": `Добавлен пол #${newGender.gender_id}`,
      }
      await this.historyService.create(historyDto);

      return newGender;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll(): Promise<GenderResponse[]> {
    try {
      const foundGenders = await this.genderRepository.findAll();
      return foundGenders;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(gender_id: number): Promise<boolean> {
    try {
      const result = await this.genderRepository.findOne({ where: { gender_id } });

      if (result) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(updateGenderDto: UpdateGenderDto, user_id: number): Promise<GenderResponse> {
    try {
      let foundGender = null;
      await this.genderRepository.update({ ...updateGenderDto }, { where: { gender_id: updateGenderDto.gender_id } });

      foundGender = await this.genderRepository.findOne({ where: { gender_id: updateGenderDto.gender_id } });

      if (foundGender) {
        const historyDto = {
          "user_id": user_id,
          "comment": `Изменен пол #${foundGender.gender_id}`,
        }
        await this.historyService.create(historyDto);
      }

      return foundGender;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(gender_id: number, user_id: number): Promise<StatusGenderResponse> {
    try {
      const deleteCategory = await this.genderRepository.destroy({ where: { gender_id } });

      if (deleteCategory) {
        const historyDto = {
          "user_id": user_id,
          "comment": `Удален пол #${gender_id}`,
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
