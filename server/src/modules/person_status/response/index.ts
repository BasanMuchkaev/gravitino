import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsString } from "class-validator";

export class PersonStatusResponse {
    @IsInt()
    @ApiProperty()
    person_status_id: number;

    @IsString()
    @ApiProperty()
    person_status_name: string;
}

export class StatusPersonStatusResponse {
    @IsBoolean()
    @ApiProperty()
    status: boolean;
}