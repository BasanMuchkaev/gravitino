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
import { Auth } from 'src/modules/auth/entities/auth.entity';
import { Group } from 'src/modules/group/entities/group.entity';
import { Order } from 'src/modules/order/entities/order.entity';
import { Organization } from 'src/modules/organization/entities/organization.entity';
import { Person } from 'src/modules/person/entities/person.entity';
import { Report } from 'src/modules/report/entities/report.entity';
import { Role } from 'src/modules/roles/entities/role.entity';
import { RolePermission } from 'src/modules/roles_permissions/entities/roles_permission.entity';
import { TransactionHistory } from 'src/modules/transaction_history/entities/transaction_history.entity';

@Table
export class User extends Model {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true })
  user_id: number;

  @ForeignKey(() => Person)
  @Column({ type: DataType.INTEGER, allowNull: false })
  person_id: number;

  @ApiProperty({
    type: () => Person,
    example: {
      person_id: 1,
      last_name: 'Иванов',
      first_name: 'Иван',
      patronymic: 'Иванович',
      gender: 'Мужской',
    },
    description: 'Данные пользователя',
  })
  @BelongsTo(() => Person)
  person: Person;

  @ForeignKey(() => Organization)
  @Column({ type: DataType.INTEGER, allowNull: false })
  organization_id: number;

  @ApiProperty({
    type: () => Organization,
    example: {
      organization_id: 1,
      organization_name: 'ООО',
      phone: '79001234567',
      address: 'г. Москва',
      email: 'email@example.com',
      ogrn: '',
      inn: '',
      kpp: '',
      okpo: '',
    },
    description: 'Организация',
  })
  @BelongsTo(() => Organization)
  organization: Organization;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER, allowNull: false })
  role_id: number;

  @ApiProperty({
    example: { role_id: 1, role_name: 'Пользователь' },
    description:
      'Роль пользователя (исполнитель, заказчик, администратор и т.д.)',
  })
  @BelongsTo(() => Role)
  role: Role;

  @ForeignKey(() => Group)
  @Column({ type: DataType.INTEGER, allowNull: true })
  group_id: number;

  @ApiProperty({
    example: { group_id: 1, group_name: 'Группа №1' },
    description: 'Группа пользователя',
  })
  @BelongsTo(() => Group)
  group: Group;

  @ApiProperty({ example: 'email', description: 'E-Mail пользователя' })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  approved: string;

  @HasMany(() => Auth, 'user_id')
  users: NonAttribute<Auth[]>;

  @HasMany(() => Report, 'report_user_id')
  reports: Report[];

  @HasMany(() => Order, 'creator_id')
  order_creators: NonAttribute<Order[]>;

  @HasMany(() => Order, 'executor_id')
  order_executors: NonAttribute<Order[]>;

  @HasMany(() => TransactionHistory, 'user_id')
  history: NonAttribute<TransactionHistory[]>;

  @HasMany(() => RolePermission, 'user_id')
  rolesPermissions: NonAttribute<RolePermission[]>;
}
