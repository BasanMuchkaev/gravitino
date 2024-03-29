import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsInt } from 'class-validator';

export class PropertyNameResponse {
  @IsInt()
  @ApiProperty()
  property_name_id: number;

  @IsString()
  @ApiProperty()
  property_name: string;

  @IsString()
  @ApiProperty()
  entity_name: string;
}

export class StatusPropertyNameResponse {
  @IsBoolean()
  @ApiProperty()
  status: boolean;
}
