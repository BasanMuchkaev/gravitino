import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Group } from './entities/group.entity';
import { TransactionHistoryModule } from '../transaction_history/transaction_history.module';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { GroupSeeds } from './seeds';

@Module({
  imports: [
    SequelizeModule.forFeature([Group]),
    TransactionHistoryModule,
    SeederModule.forFeature([GroupSeeds]),
  ],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
