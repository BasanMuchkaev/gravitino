import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsInt } from 'class-validator';

export class PropertyValueResponse {
  @IsInt()
  @ApiProperty()
  property_value_id: number;

  @IsInt()
  @ApiProperty()
  property_name_id: number;

  @IsString()
  @ApiProperty()
  property_value: string;
}

export class StatusPropertValueResponse {
  @IsBoolean()
  @ApiProperty()
  status: boolean;
}
