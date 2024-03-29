import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import { CheckpointService } from './checkpoint.service';
import { CreateCheckpointDto, UpdateCheckpointDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';
import { AppError } from 'src/common/constants/error';
import { AllExceptionsFilter } from 'src/common/exception.filter';
import { BranchService } from '../branch/branch.service';

@ApiBearerAuth()
@ApiTags('checkpoint')
@Controller('checkpoint')
@UseFilters(AllExceptionsFilter)
export class CheckpointController {
  constructor(
    private readonly checkpointService: CheckpointService,
    private readonly branchService: BranchService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createCheckpointDto: CreateCheckpointDto,
    @Req() request,
  ) {
    const foundBranch = await this.branchService.findOne(
      createCheckpointDto.branch_id,
    );
    if (!foundBranch) {
      throw new HttpException(
        AppError.ORGANIZATION_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.checkpointService.create(
      createCheckpointDto,
      request.user.user_id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async findAll() {
    return this.checkpointService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(
    @Body() updateCheckpointDto: UpdateCheckpointDto,
    @Req() request,
  ) {
    let foundCheckpoint = null;
    if (updateCheckpointDto.checkpoint_id) {
      foundCheckpoint = await this.checkpointService.findOne(
        updateCheckpointDto.checkpoint_id,
      );
    }
    if (!foundCheckpoint) {
      throw new HttpException(
        AppError.CHECKPOINT_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    if (updateCheckpointDto.branch_id) {
      const foundBranch = await this.branchService.findOne(
        updateCheckpointDto.branch_id,
      );
      if (!foundBranch) {
        throw new HttpException(
          AppError.ORGANIZATION_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }
    }

    return this.checkpointService.update(
      updateCheckpointDto,
      request.user.user_id,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Req() request) {
    const foundCheckpoint = await this.checkpointService.findOne(id);
    if (!foundCheckpoint) {
      throw new HttpException(
        AppError.CHECKPOINT_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.checkpointService.remove(+id, request.user.user_id);
  }
}
