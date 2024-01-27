import { ApiProperty } from "@nestjs/swagger";
import { NonAttribute } from "sequelize";
import { Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Person } from "src/modules/person/entities/person.entity";

@Table
export class PersonStatus extends Model {
    @PrimaryKey
    @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true, })
    person_status_id: number

    @ApiProperty({ example: 'Активен', description: 'Статус пользователя' })
    @Column({ type: DataType.STRING, allowNull: false })
    person_status_name: string;

    @HasMany(() => Person, 'person_status_id')
    people: NonAttribute<Person[]>;
}