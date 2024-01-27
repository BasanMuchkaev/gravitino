import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './entities/order.entity';
import { TransactionHistoryModule } from '../transaction_history/transaction_history.module';
import { TaskModule } from '../task/task.module';
import { OrganizationModule } from '../organization/organization.module';
import { UsersModule } from '../users/users.module';
import { OrderStatusModule } from '../order_status/order_status.module';
import { PriorityModule } from '../priority/priority.module';
import { OrderSeeds } from './seeds';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { CheckpointModule } from '../checkpoint/checkpoint.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Order]),
    TaskModule,
    CheckpointModule,
    OrganizationModule,
    UsersModule,
    OrderStatusModule,
    PriorityModule,
    TransactionHistoryModule,
    SeederModule.forFeature([OrderSeeds]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
