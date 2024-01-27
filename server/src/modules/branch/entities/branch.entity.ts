import { ApiProperty } from '@nestjs/swagger';
import { NonAttribute } from 'sequelize';
import { HasMany, Model, Table } from 'sequelize-typescript';
import {
  PrimaryKey,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Checkpoint } from 'src/modules/checkpoint/entities/checkpoint.entity';
import { Organization } from 'src/modules/organization/entities/organization.entity';

@Table
export class Branch extends Model {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true })
  branch_id: number;

  @ApiProperty({ example: 'Филиал №1', description: 'Название филиала' })
  @Column({ type: DataType.STRING, allowNull: false })
  branch_name: string;

  @ApiProperty({
    example: 'улица У.',
    description: 'Местоположение пункта пропуска',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  location: string;

  @ApiProperty({ example: 'г. Москва', description: 'Город' })
  @Column({ type: DataType.STRING, allowNull: false })
  city: string;

  @ForeignKey(() => Organization)
  @Column({ type: DataType.INTEGER, allowNull: false })
  organization_id: number;

  @ApiProperty({
    type: () => Organization,
    description: 'Организация',
  })
  @BelongsTo(() => Organization)
  organization: Organization;

  @HasMany(() => Checkpoint, 'branch_id')
  checkponts: NonAttribute<Checkpoint[]>;
}
