import { Injectable } from '@nestjs/common';
import { CreateFileDto, UpdateFileDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { File } from './entities/file.entity';
import { TransactionHistoryService } from '../transaction_history/transaction_history.service';
import { FileResponse, StatusFileResponse } from './response';
import { FileType } from '../file_type/entities/file_type.entity';
import { Order } from '../order/entities/order.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectModel(File) private fileRepository: typeof File,
    private readonly historyService: TransactionHistoryService,
  ) {}

  async create(
    createFileDto: CreateFileDto,
    user_id: number,
  ): Promise<FileResponse> {
    const newFile = await this.fileRepository.create({ ...createFileDto });

    const historyDto = {
      user_id: user_id,
      comment: `Создан файл #${newFile.file_id}`,
    };
    await this.historyService.create(historyDto);

    return newFile;
  }

  async findAll(): Promise<FileResponse[]> {
    try {
      const result = await this.fileRepository.findAll({
        include: [FileType, Order],
        attributes: { exclude: ['file_type_id', 'order_id'] },
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(file_id: number): Promise<boolean> {
    try {
      const foundFile = await this.fileRepository.findOne({
        where: { file_id },
      });

      if (foundFile) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(
    updateFileDto: UpdateFileDto,
    user_id: number,
  ): Promise<FileResponse> {
    try {
      let foundFile = null;
      await this.fileRepository.update(
        { ...updateFileDto },
        { where: { file_id: updateFileDto.file_id } },
      );

      foundFile = await this.fileRepository.findOne({
        where: { file_id: updateFileDto.file_id },
      });

      if (foundFile) {
        const historyDto = {
          user_id: user_id,
          comment: `Изменен филиал #${foundFile.file_id}`,
        };
        await this.historyService.create(historyDto);
      }

      return foundFile;
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(file_id: number, user_id: number): Promise<StatusFileResponse> {
    const deleteFile = await this.fileRepository.destroy({
      where: { file_id },
    });

    if (deleteFile) {
      const historyDto = {
        user_id: user_id,
        comment: `Удален файл #${file_id}`,
      };
      await this.historyService.create(historyDto);

      return { status: true };
    }

    return { status: false };
  }
}
