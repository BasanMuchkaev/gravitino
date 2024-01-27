import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common';
import { PersonStatusService } from './person_status.service';
import { CreatePersonStatusDto, UpdatePersonStatusDto } from './dto';
import { AllExceptionsFilter } from 'src/common/exception.filter';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HasPermissions } from '../auth/guards/permissions.decorator';
import { PermissionEnum } from '../auth/guards/enums/permission.enum';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { AppError } from 'src/common/constants/error';

@ApiTags('person-status')
@Controller('person-status')
@UseFilters(AllExceptionsFilter)
export class PersonStatusController {
  constructor(private readonly personStatusService: PersonStatusService) { }

  @ApiBearerAuth()
  @HasPermissions(PermissionEnum.PersonStatusCreate)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createPersonStatusDto: CreatePersonStatusDto, @Req() request) {
    return this.personStatusService.create(createPersonStatusDto, request.user.user_id);
  }

  @Get('all')
  async findAll() {
    return this.personStatusService.findAll();
  }

  @ApiBearerAuth()
  @HasPermissions(PermissionEnum.PersonStatusUpdate)
  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Body() updatePersonStatusDto: UpdatePersonStatusDto, @Req() request) {
    let foundPersonStatus = null;
    if (updatePersonStatusDto.person_status_id) {
      foundPersonStatus = await this.personStatusService.findOne(updatePersonStatusDto.person_status_id);
    }
    if (!foundPersonStatus) {
      throw new HttpException(AppError.PERSON_STATUS_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return this.personStatusService.update(updatePersonStatusDto, request.user.user_id);
  }

  @ApiBearerAuth()
  @HasPermissions(PermissionEnum.PersonStatusDelete)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Req() request) {
    const foundPersonStatus = await this.personStatusService.findOne(id);
    if (foundPersonStatus == null) {
      throw new HttpException(AppError.PERSON_STATUS_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return this.personStatusService.remove(+id, request.user.user_id);
  }
}
