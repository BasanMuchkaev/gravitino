import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsString } from 'class-validator';

export class PersonResponse {
  @IsInt()
  @ApiProperty()
  person_id: number;

  @IsString()
  @ApiProperty()
  last_name: string;

  @IsString()
  @ApiProperty()
  first_name: string;

  @IsString()
  @ApiProperty()
  patronymic: string;

  @IsString()
  @ApiProperty()
  gender_id: number;

  @IsInt()
  @ApiProperty()
  person_status_id: number;

  @IsString()
  @ApiProperty()
  phone: string;

  @ApiProperty()
  property_values?: number[];
}

export class StatusPersonResponse {
  @IsBoolean()
  @ApiProperty()
  status: boolean;
}
