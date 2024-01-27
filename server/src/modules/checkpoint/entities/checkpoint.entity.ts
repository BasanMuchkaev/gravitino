import { ApiProperty } from '@nestjs/swagger';
import { NonAttribute } from 'sequelize';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Branch } from 'src/modules/branch/entities/branch.entity';
import { Order } from 'src/modules/order/entities/order.entity';

@Table
export class Checkpoint extends Model {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true })
  checkpoint_id: number;

  @ForeignKey(() => Branch)
  @Column({ type: DataType.INTEGER, allowNull: false })
  branch_id: number;

  @ApiProperty({
    type: () => Branch,
    description: 'Филиал',
  })
  @BelongsTo(() => Branch)
  branch: Branch;

  @ApiProperty({
    example: 'Пункт пропуска №1',
    description: 'Название пункта пропуска',
  })
  @Column({ type: DataType.STRING(30), allowNull: false })
  checkpoint_name: string;

  @ApiProperty({ example: 'Круглосуточно', description: 'Часы работы' })
  @Column({ type: DataType.STRING, allowNull: true })
  working_hours?: string;

  @ApiProperty({ example: 'Постоянный', description: 'Режим работы' })
  @Column({ type: DataType.STRING, allowNull: true })
  operating_mode?: string;

  @ApiProperty({
    example: 'улица У.',
    description: 'Местоположение пункта пропуска',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  location: string;

  @ApiProperty({ example: 'г. Москва', description: 'Город' })
  @Column({ type: DataType.STRING, allowNull: false })
  city: string;

  @ApiProperty({ example: '1,2,3', description: 'ID характеристик' })
  @Column({ type: DataType.ARRAY(DataType.INTEGER) })
  property_values?: number[];

  @HasMany(() => Order, 'checkpoint_id')
  orders: NonAttribute<Order[]>;
}
