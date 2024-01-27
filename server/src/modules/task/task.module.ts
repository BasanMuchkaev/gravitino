import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './entities/task.entity';
import { TransactionHistoryModule } from '../transaction_history/transaction_history.module';
import { CategoryModule } from '../category/category.module';
import { TaskSeeds } from './seeds';
import { SeederModule } from 'nestjs-sequelize-seeder';

@Module({
  imports: [
    SequelizeModule.forFeature([Task]),
    CategoryModule,
    TransactionHistoryModule,
    SeederModule.forFeature([TaskSeeds]),
  ],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
