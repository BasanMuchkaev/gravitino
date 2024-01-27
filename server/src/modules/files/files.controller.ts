import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto, UpdateFileDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { OrderService } from '../order/order.service';
import { FileTypeService } from '../file_type/file_type.service';
import { AppError } from 'src/common/constants/error';

@ApiBearerAuth()
@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly orderService: OrderService,
    private readonly fileTypeService: FileTypeService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createFileDto: CreateFileDto, @Req() request) {
    const foundOrder = await this.orderService.findOne(createFileDto.order_id);
    if (!foundOrder) {
      throw new HttpException(AppError.ORDER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const foundFileType = await this.fileTypeService.findOne(
      createFileDto.file_type_id,
    );
    if (!foundFileType) {
      throw new HttpException(
        AppError.FILE_TYPE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.filesService.create(createFileDto, request.user.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.filesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Body() updateFileDto: UpdateFileDto, @Req() request) {
    let foundFile = null;
    if (updateFileDto.file_id) {
      foundFile = await this.filesService.findOne(updateFileDto.file_id);
    }
    if (!foundFile) {
      throw new HttpException(AppError.FILE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    if (updateFileDto.order_id) {
      const foundOrder = await this.orderService.findOne(
        updateFileDto.order_id,
      );
      if (!foundOrder) {
        throw new HttpException(AppError.ORDER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
    }

    if (updateFileDto.file_type_id) {
      const foundFileType = await this.fileTypeService.findOne(
        updateFileDto.file_type_id,
      );
      if (!foundFileType) {
        throw new HttpException(
          AppError.FILE_TYPE_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }
    }

    return this.filesService.update(updateFileDto, request.user.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Req() request) {
    const foundFile = await this.filesService.findOne(id);
    if (!foundFile) {
      throw new HttpException(AppError.FILE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return this.filesService.remove(+id, request.user.user_id);
  }
}
