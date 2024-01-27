import { Controller, Get, UseFilters } from '@nestjs/common';
import { GenderService } from './gender.service';
import { ApiTags } from '@nestjs/swagger';
import { AllExceptionsFilter } from 'src/common/exception.filter';

@ApiTags('gender')
@Controller('gender')
@UseFilters(AllExceptionsFilter)
export class GenderController {
  constructor(private readonly genderService: GenderService) { }

  // @ApiBearerAuth()
  // @HasPermissions(PermissionEnum.GenderCreate)
  // @UseGuards(JwtAuthGuard)
  // @Post()
  // async create(@Body() createGenderDto: CreateGenderDto, @Req() request) {
  //   return this.genderService.create(createGenderDto, request.user.user_id);
  // }

  @Get('all')
  async findAll() {
    return this.genderService.findAll();
  }

  // @ApiBearerAuth()
  // @HasPermissions(PermissionEnum.GenderUpdate)
  // @UseGuards(JwtAuthGuard)
  // @Patch()
  // async update(@Body() updateGenderDto: UpdateGenderDto, @Req() request) {
  //   let foundGender = null;
  //   if (updateGenderDto.gender_id) {
  //     foundGender = await this.genderService.findOne(updateGenderDto.gender_id);
  //   }
  //   if (!foundGender) {
  //     throw new HttpException(AppError.GENDER_NOT_FOUND, HttpStatus.NOT_FOUND);
  //   }

  //   return this.genderService.update(updateGenderDto, request.user.user_id);
  // }

  // @ApiBearerAuth()
  // @HasPermissions(PermissionEnum.GenderDelete)
  // @UseGuards(JwtAuthGuard)
  // @Delete(':id')
  // async remove(@Param('id') id: number, @Req() request) {
  //   const foundGender = await this.genderService.findOne(id);
  //   if (foundGender == null) {
  //     throw new HttpException(AppError.GENDER_NOT_FOUND, HttpStatus.NOT_FOUND);
  //   }

  //   return this.genderService.remove(+id, request.user.user_id);
  // }
}
