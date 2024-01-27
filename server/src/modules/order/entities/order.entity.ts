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
import { Checkpoint } from 'src/modules/checkpoint/entities/checkpoint.entity';
import { File } from 'src/modules/files/entities/file.entity';
import { OrderStatus } from 'src/modules/order_status/entities/order_status.entity';
import { Organization } from 'src/modules/organization/entities/organization.entity';
import { OrderPriority } from 'src/modules/priority/entities/priority.entity';
import { Task } from 'src/modules/task/entities/task.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Table
export class Order extends Model {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true })
  order_id: number;

  @ForeignKey(() => Task)
  @Column({ type: DataType.INTEGER, allowNull: true })
  task_id?: number;

  @ApiProperty({
    type: () => Task,
    example: {
      task_id: 1,
      name: 'Название',
      description: 'Описание',
      category_id: 1,
      work_type: 'Тип работы',
    },
    description: 'Задача',
  })
  @BelongsTo(() => Task)
  task: Task;

  @Column({ type: DataType.STRING, allowNull: true })
  task_name?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  task_description?: string;

  @ForeignKey(() => Checkpoint)
  @Column({ type: DataType.INTEGER, allowNull: false })
  checkpoint_id: number;

  @ApiProperty({
    type: () => Checkpoint,
    description: 'Пункт пропуска',
  })
  @BelongsTo(() => Checkpoint)
  checkpoint: Checkpoint;

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

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  executor_id: number;

  @BelongsTo(() => User, 'executor_id')
  executor: User;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  creator_id: number;

  @BelongsTo(() => User, 'creator_id')
  creator: User;

  @ForeignKey(() => OrderStatus)
  @Column({ type: DataType.INTEGER, allowNull: false })
  status_id: number;

  @BelongsTo(() => OrderStatus)
  status: OrderStatus;

  @Column
  planned_datetime: Date;

  @Column
  task_end_datetime: Date;

  @ForeignKey(() => OrderPriority)
  @Column({ type: DataType.INTEGER, allowNull: false })
  priority_id: number;

  @BelongsTo(() => OrderPriority)
  priority: OrderPriority;

  @ApiProperty({ example: '1,2,3', description: 'ID характеристик' })
  @Column({ type: DataType.ARRAY(DataType.INTEGER) })
  property_values?: number[];

  @HasMany(() => File, 'order_id')
  files: NonAttribute<File[]>;
}
