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
  UseFilters,
} from '@nestjs/common';
import { PropertyValuesService } from './property_values.service';
import { CreatePropertyValueDto, UpdatePropertyValueDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { PropertyNamesService } from '../property_names/property_names.service';
import { AppError } from 'src/common/constants/error';
import { AllExceptionsFilter } from 'src/common/exception.filter';

@ApiBearerAuth()
@ApiTags('Property values')
@Controller('property-values')
@UseFilters(AllExceptionsFilter)
export class PropertyValuesController {
  constructor(
    private readonly propertyValuesService: PropertyValuesService,
    private readonly propertyNamesService: PropertyNamesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createPropertyValueDto: CreatePropertyValueDto,
    @Req() request,
  ) {
    const foundPropertyName = await this.propertyNamesService.findOne(
      createPropertyValueDto.property_name_id,
    );
    if (!foundPropertyName) {
      throw new HttpException(
        AppError.PROPERTY_NAME_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.propertyValuesService.create(
      createPropertyValueDto,
      request.user.user_id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.propertyValuesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(
    @Body() updatePropertyValueDto: UpdatePropertyValueDto,
    @Req() request,
  ) {
    let foundPropertyValue = null;
    if (updatePropertyValueDto.property_value_id) {
      foundPropertyValue = await this.propertyValuesService.findOne(
        updatePropertyValueDto.property_value_id,
      );
    }
    if (!foundPropertyValue) {
      throw new HttpException(
        AppError.PROPERTY_VALUE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    if (updatePropertyValueDto.property_name_id) {
      const foundPropertyName = await this.propertyNamesService.findOne(
        updatePropertyValueDto.property_name_id,
      );
      if (!foundPropertyName) {
        throw new HttpException(
          AppError.PROPERTY_NAME_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }
    }
    return this.propertyValuesService.update(
      updatePropertyValueDto,
      request.user.user_id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Req() request) {
    const foundPropertyValue = await this.propertyValuesService.findOne(id);
    if (!foundPropertyValue) {
      throw new HttpException(
        AppError.PROPERTY_VALUE_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.propertyValuesService.remove(+id, request.user.user_id);
  }
}
