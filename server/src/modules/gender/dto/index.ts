import { ApiProperty } from "@nestjs/swagger";

export class CreateGenderDto {
    @ApiProperty()
    gender_name: string;
}

export class UpdateGenderDto {
    @ApiProperty({ default: 1 })
    gender_id?: number;

    @ApiProperty()
    gender_name?: string;
}