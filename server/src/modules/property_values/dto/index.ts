import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreatePropertyValueDto {
  @IsInt()
  @ApiProperty()
  property_name_id: number;

  @IsString()
  @ApiProperty()
  property_value: string;
}

export class UpdatePropertyValueDto {
  @IsInt()
  @IsOptional()
  @ApiProperty()
  property_value_id: number;

  @IsInt()
  @IsOptional()
  @ApiProperty()
  property_name_id?: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  property_value?: string;
}
