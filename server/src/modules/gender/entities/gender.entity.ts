import { ApiProperty } from "@nestjs/swagger";
import { NonAttribute } from "sequelize";
import { Column, DataType, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Person } from "src/modules/person/entities/person.entity";

@Table
export class Gender extends Model {
    @PrimaryKey
    @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true, })
    gender_id: number

    @ApiProperty({ example: 'Мужской', description: 'Пол' })
    @Column({ type: DataType.STRING, allowNull: false })
    gender_name: string;

    @HasMany(() => Person, 'gender_id')
    rolesPermissions: NonAttribute<Person[]>;
}
