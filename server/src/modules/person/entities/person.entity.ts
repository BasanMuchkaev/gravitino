import { ApiProperty } from '@nestjs/swagger';
import { NonAttribute } from 'sequelize';
import { BelongsTo, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Column, DataType, HasOne, PrimaryKey } from 'sequelize-typescript';
import { PersonStatus } from "src/modules/person_status/entities/person_status.entity";
import { Gender } from "src/modules/gender/entities/gender.entity";
import { User } from 'src/modules/users/entities/user.entity';

@Table
export class Person extends Model {
  @PrimaryKey
  @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true })
  person_id: number;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия пользователя' })
  @Column({ type: DataType.STRING(30), allowNull: false })
  last_name: string;

  @ApiProperty({ example: 'Иван', description: 'Имя пользователя' })
  @Column({ type: DataType.STRING(30), allowNull: false })
  first_name: string;

  @ApiProperty({ example: 'Иванович', description: 'Отчество пользователя' })
  @Column({ type: DataType.STRING(30), defaultValue: '' })
  patronymic: string;

  @ForeignKey(() => Gender)
  @Column({ type: DataType.INTEGER, allowNull: false, })
  gender_id: number;

  @ApiProperty({
    type: () => Gender,
    example: {
      gender_id: 1,
      gender_name: 'Мужской'
    },
    description: 'Пол пользователя'
  })
  @BelongsTo(() => Gender)
  gender: Gender;

  @ForeignKey(() => PersonStatus)
  @Column({ type: DataType.INTEGER, allowNull: false, })
  person_status_id: number;

  @ApiProperty({
    type: () => PersonStatus,
    example: {
      person_status_id: 1,
      person_status_name: 'Активен'
    },
    description: 'Статус пользователя'
  })
  @BelongsTo(() => PersonStatus)
  person_status: PersonStatus;

  @ApiProperty({
    example: '+79001234567',
    description: 'Номер телефона пользователя',
  })
  @Column({ type: DataType.STRING(12) })
  phone: string;

  @ApiProperty({ example: '1,2,3', description: 'ID характеристик' })
  @Column({ type: DataType.ARRAY(DataType.INTEGER), allowNull: true })
  property_values?: number[];

  @HasOne(() => User, 'person_id')
  user: NonAttribute<User>;
}
