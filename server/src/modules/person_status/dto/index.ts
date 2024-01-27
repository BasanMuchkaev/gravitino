import { ApiProperty } from "@nestjs/swagger";

export class CreatePersonStatusDto {
    @ApiProperty()
    person_status_name: string;
}

export class UpdatePersonStatusDto {
    @ApiProperty({ default: 1 })
    person_status_id?: number;

    @ApiProperty()
    person_status_name?: string;
}