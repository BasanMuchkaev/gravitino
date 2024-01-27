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
import { BranchService } from './branch.service';
import { CreateBranchDto, UpdateBranchDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { AppError } from 'src/common/constants/error';
import { OrganizationService } from '../organization/organization.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AllExceptionsFilter } from 'src/common/exception.filter';

@ApiBearerAuth()
@ApiTags('Branch')
@Controller('branch')
@UseFilters(AllExceptionsFilter)
export class BranchController {
  constructor(
    private readonly branchService: BranchService,
    private readonly organizationService: OrganizationService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createBranchDto: CreateBranchDto, @Req() request) {
    const foundOrganization = await this.organizationService.findOne(
      createBranchDto.organization_id,
    );
    if (!foundOrganization) {
      throw new HttpException(
        AppError.ORGANIZATION_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.branchService.create(createBranchDto, request.user.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.branchService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Body() updateBranchDto: UpdateBranchDto, @Req() request) {
    let foundBranch = null;
    if (updateBranchDto.branch_id) {
      foundBranch = await this.branchService.findOne(updateBranchDto.branch_id);
    }
    if (!foundBranch) {
      throw new HttpException(AppError.BRANCH_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    if (updateBranchDto.organization_id) {
      const foundOrganization = await this.organizationService.findOne(
        updateBranchDto.organization_id,
      );
      if (!foundOrganization) {
        throw new HttpException(
          AppError.ORGANIZATION_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }
    }

    return this.branchService.update(updateBranchDto, request.user.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Req() request) {
    const foundBranch = await this.branchService.findOne(id);
    if (!foundBranch) {
      throw new HttpException(AppError.BRANCH_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return this.branchService.remove(+id, request.user.user_id);
  }
}
