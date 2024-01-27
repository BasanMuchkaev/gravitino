import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean } from "class-validator";

export class GenderResponse {
    @ApiProperty({ default: 1 })
    gender_id: number;

    @ApiProperty()
    gender_name: string;
}

export class StatusGenderResponse {
    @IsBoolean()
    @ApiProperty()
    status: boolean;
}