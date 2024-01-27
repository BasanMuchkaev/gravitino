import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreatePropertyNameDto {
  @IsString()
  @ApiProperty()
  property_name: string;

  @IsString()
  @ApiProperty()
  entity_name: string;
}

export class UpdatePropertyNameDto {
  @IsInt()
  @IsOptional()
  @ApiProperty()
  property_name_id?: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  property_name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  entity_name?: string;
}
