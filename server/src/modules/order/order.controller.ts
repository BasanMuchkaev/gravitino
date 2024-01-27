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
import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/guards/auth.guard';
import { OrganizationService } from '../organization/organization.service';
import { UsersService } from '../users/users.service';
import { OrderStatusService } from '../order_status/order_status.service';
import { PriorityService } from '../priority/priority.service';
import { TaskService } from '../task/task.service';
import { AppError } from 'src/common/constants/error';
import { AllExceptionsFilter } from 'src/common/exception.filter';
import { CheckpointService } from '../checkpoint/checkpoint.service';

@Controller('order')
@ApiTags('order')
@ApiBearerAuth()
@UseFilters(AllExceptionsFilter)
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly taskService: TaskService,
    private readonly checkpointService: CheckpointService,
    private readonly organizationService: OrganizationService,
    private readonly usersService: UsersService,
    private readonly orderStatusService: OrderStatusService,
    private readonly priorityService: PriorityService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createOrderDto: CreateOrderDto, @Req() request) {
    if (createOrderDto.task_id && createOrderDto.task_name) {
      if (createOrderDto.task_id) {
        const foundTask = await this.taskService.findOne(
          createOrderDto.task_id,
        );
        if (!foundTask) {
          throw new HttpException(
            AppError.TASK_NOT_FOUND,
            HttpStatus.NOT_FOUND,
          );
        }
      }
    } else {
      throw new HttpException(
        AppError.ORDER_BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
      );
    }

    const foundCheckpoint = await this.checkpointService.findOne(
      createOrderDto.checkpoint_id,
    );
    if (!foundCheckpoint) {
      throw new HttpException(AppError.BRANCH_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const foundOrganization = await this.organizationService.findOne(
      createOrderDto.organization_id,
    );
    if (!foundOrganization) {
      throw new HttpException(
        AppError.ORGANIZATION_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const foundExecutor = await this.usersService.findOne(
      createOrderDto.executor_id,
    );
    if (!foundExecutor) {
      throw new HttpException(AppError.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const foundCreator = await this.usersService.findOne(
      createOrderDto.creator_id,
    );
    if (!foundCreator) {
      throw new HttpException(AppError.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const foundOrderStatus = await this.orderStatusService.findOne(
      createOrderDto.status_id,
    );
    if (!foundOrderStatus) {
      throw new HttpException(
        AppError.ORDER_STATUS_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const foundPriority = await this.priorityService.findOne(
      createOrderDto.priority_id,
    );
    if (!foundPriority) {
      throw new HttpException(
        AppError.PRIORITY_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.orderService.create(createOrderDto, request.user.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async findAll() {
    return this.orderService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('all-by-user/:user_id')
  findAllByUserr(@Param('user_id') user_id: number) {
    return this.orderService.findAllByUser(user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Body() updateOrderDto: UpdateOrderDto, @Req() request) {
    let foundOrder = null;
    if (updateOrderDto.order_id) {
      foundOrder = await this.orderService.findOne(updateOrderDto.order_id);
    }
    if (!foundOrder) {
      throw new HttpException(AppError.ORDER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    if (updateOrderDto.task_id) {
      const foundTask = await this.taskService.findOne(updateOrderDto.task_id);
      if (!foundTask) {
        throw new HttpException(AppError.TASK_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
    }
    if (updateOrderDto.checkpoint_id) {
      const foundCheckpoint = await this.checkpointService.findOne(
        updateOrderDto.checkpoint_id,
      );
      if (!foundCheckpoint) {
        throw new HttpException(
          AppError.BRANCH_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }
    }
    if (updateOrderDto.organization_id) {
      const foundOrganization = await this.organizationService.findOne(
        updateOrderDto.organization_id,
      );
      if (!foundOrganization) {
        throw new HttpException(
          AppError.ORGANIZATION_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }
    }
    if (updateOrderDto.executor_id) {
      const foundExecutor = await this.usersService.findOne(
        updateOrderDto.executor_id,
      );
      if (!foundExecutor) {
        throw new HttpException(AppError.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
    }
    if (updateOrderDto.creator_id) {
      const foundCreator = await this.usersService.findOne(
        updateOrderDto.creator_id,
      );
      if (!foundCreator) {
        throw new HttpException(AppError.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
      }
    }
    if (updateOrderDto.status_id) {
      const foundOrderStatus = await this.orderStatusService.findOne(
        updateOrderDto.status_id,
      );
      if (!foundOrderStatus) {
        throw new HttpException(
          AppError.ORDER_STATUS_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }
    }
    if (updateOrderDto.priority_id) {
      const foundPriority = await this.priorityService.findOne(
        updateOrderDto.priority_id,
      );
      if (!foundPriority) {
        throw new HttpException(
          AppError.PRIORITY_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }
    }

    return this.orderService.update(updateOrderDto, request.user.user_id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Req() request) {
    const foundOrder = await this.orderService.findOne(id);
    if (!foundOrder) {
      throw new HttpException(AppError.ORDER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return this.orderService.remove(+id, request.user.user_id);
  }
}
