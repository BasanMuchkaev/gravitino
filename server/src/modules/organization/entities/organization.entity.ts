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
import { OrganizationType } from 'src/modules/organization_type/entities/organization_type.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Table
export class Organization extends Model {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true })
  organization_id: number;

  @ForeignKey(() => OrganizationType)
  @Column({ type: DataType.INTEGER, allowNull: false })
  organization_type_id: number;

  @ApiProperty({
    type: () => OrganizationType,
    example: {
      organization_type_id: 1,
      type_name: 'Филиал',
    },
    description: 'Тип организации',
  })
  @BelongsTo(() => OrganizationType)
  organization_type: OrganizationType;

  @ApiProperty()
  @Column({ type: DataType.STRING, allowNull: false })
  full_name: string;

  @ApiProperty()
  @Column({ type: DataType.STRING, allowNull: false })
  short_name: string;

  @ApiProperty()
  @Column({ type: DataType.STRING, allowNull: false })
  register_number: string;

  @ApiProperty()
  @Column({ type: DataType.STRING, allowNull: false })
  bic: string;

  @ApiProperty({
    example: '79001234567',
    description: 'Номер телефона организации',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  phone: string;

  @ApiProperty({
    example: 'г. Москва',
    description: 'Юридический адрес организации',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  address: string;

  @ApiProperty({ example: '0', description: 'Email организации' })
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: '' })
  email: string;

  @ApiProperty({ example: '0', description: 'ОГРН организации' })
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: '' })
  ogrn: string;

  @ApiProperty({ example: '0', description: 'ИНН организации' })
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: '' })
  inn: string;

  @ApiProperty({ example: '0', description: 'КПП организации' })
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: '' })
  kpp: string;

  @ApiProperty({ example: '0', description: 'ОКПО организации' })
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: '' })
  okpo: string;

  @ApiProperty({ example: '1,2,3', description: 'ID характеристик' })
  @Column({ type: DataType.ARRAY(DataType.INTEGER), allowNull: true })
  property_values?: number[];

  @HasMany(() => User, 'organization_id')
  users: NonAttribute<User[]>;

  @HasMany(() => Order, 'organization_id')
  orders: NonAttribute<Order[]>;

  @HasMany(() => Branch, 'organization_id')
  branches: NonAttribute<Branch[]>;
}
