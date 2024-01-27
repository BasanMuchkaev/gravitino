import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsInt, IsString } from 'class-validator';

export class OrganizationResponse {
  @IsInt()
  @ApiProperty()
  organization_id: number;

  @IsInt()
  @ApiProperty()
  organization_type_id: number;

  @IsString()
  @ApiProperty()
  full_name: string;

  @IsString()
  @ApiProperty()
  short_name: string;

  @IsString()
  @ApiProperty()
  register_number: string;

  @IsString()
  @ApiProperty()
  bic: string;

  @IsString()
  @ApiProperty()
  phone: string;

  @IsString()
  @ApiProperty()
  address: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  ogrn: string;

  @IsString()
  @ApiProperty()
  inn: string;

  @IsString()
  @ApiProperty()
  kpp: string;

  @IsString()
  @ApiProperty()
  okpo: string;

  @ApiProperty()
  property_values?: number[];
}

export class StatusOrganizationResponse {
  @IsBoolean()
  @ApiProperty()
  status: boolean;
}
