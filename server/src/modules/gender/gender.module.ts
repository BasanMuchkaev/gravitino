import { Module } from '@nestjs/common';
import { GenderService } from './gender.service';
import { GenderController } from './gender.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Gender } from './entities/gender.entity';
import { TransactionHistoryModule } from '../transaction_history/transaction_history.module';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { GenderSeeds } from './seeds';

@Module({
  imports: [
    SequelizeModule.forFeature([Gender]), TransactionHistoryModule,
    SeederModule.forFeature([GenderSeeds]),
  ],
  controllers: [GenderController],
  providers: [GenderService],
  exports: [GenderService]
})
export class GenderModule { }
