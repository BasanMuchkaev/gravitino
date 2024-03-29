import { Module } from '@nestjs/common';
import { OrganizationTypeService } from './organization_type.service';
import { OrganizationTypeController } from './organization_type.controller';
import { OrganizationType } from './entities/organization_type.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { TransactionHistoryModule } from '../transaction_history/transaction_history.module';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { OrganizationTypeSeeds } from './seeds';

@Module({
  imports: [
    SequelizeModule.forFeature([OrganizationType]),
    TransactionHistoryModule,
    SeederModule.forFeature([OrganizationTypeSeeds]),
  ],
  controllers: [OrganizationTypeController],
  providers: [OrganizationTypeService],
  exports: [OrganizationTypeService],
})
export class OrganizationTypeModule {}
