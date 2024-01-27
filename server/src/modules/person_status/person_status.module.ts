import { Module } from '@nestjs/common';
import { PersonStatusService } from './person_status.service';
import { PersonStatusController } from './person_status.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PersonStatus } from './entities/person_status.entity';
import { TransactionHistoryModule } from '../transaction_history/transaction_history.module';
import { RolesPermissionsModule } from '../roles_permissions/roles_permissions.module';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { PersonStatusSeeds } from './seeds';

@Module({
  imports: [
    SequelizeModule.forFeature([PersonStatus]), TransactionHistoryModule, RolesPermissionsModule,
    SeederModule.forFeature([PersonStatusSeeds])
  ],
  controllers: [PersonStatusController],
  providers: [PersonStatusService],
  exports: [PersonStatusService]
})
export class PersonStatusModule { }
