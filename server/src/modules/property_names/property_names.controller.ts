import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  HttpException,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { PropertyNamesService } from './property_names.service';
import { CreatePropertyNameDto, UpdatePropertyNameDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { AppError } from 'src/common/constants/error';
import { AllExceptionsFilter } from 'src/common/exception.filter';

@ApiBearerAuth()
@ApiTags('Property names')
@Controller('property-names')
@UseFilters(AllExceptionsFilter)
export class PropertyNamesController {
  constructor(private readonly propertyNamesService: PropertyNamesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPropertyNameDto: CreatePropertyNameDto, @Req() request) {
    return this.propertyNamesService.create(
      createPropertyNameDto,
      request.user.user_id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.propertyNamesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(
    @Body() updatePropertyNameDto: UpdatePropertyNameDto,
    @Req() request,
  ) {
    let foundPropertyName = null;
    if (updatePropertyNameDto.property_name_id) {
      foundPropertyName = await this.propertyNamesService.findOne(
        updatePropertyNameDto.property_name_id,
      );
    }
    if (!foundPropertyName) {
      throw new HttpException(
        AppError.PROPERTY_NAME_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.propertyNamesService.update(
      updatePropertyNameDto,
      request.user.user_id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Req() request) {
    const foundPropertyName = await this.propertyNamesService.findOne(id);
    if (!foundPropertyName) {
      throw new HttpException(
        AppError.PROPERTY_NAME_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.propertyNamesService.remove(+id, request.user.user_id);
  }
}
