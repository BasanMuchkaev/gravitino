import { ApiProperty } from '@nestjs/swagger';
import { NonAttribute } from 'sequelize';
import {
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Task } from 'src/modules/task/entities/task.entity';

@Table
export class Category extends Model {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true })
  category_id: number;

  @ApiProperty({ example: 'Категория №1', description: 'Название категории' })
  @Column({ type: DataType.STRING, allowNull: false })
  category_name: string;

  @HasMany(() => Task, 'category_id')
  tasks: NonAttribute<Task[]>;
}
