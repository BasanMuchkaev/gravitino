import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  last_name: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  patronymic?: string;

  @ApiProperty()
  gender_id: number;

  @ApiProperty()
  phone: string;

  @IsOptional()
  person_id?: number;

  @ApiProperty({ default: 1 })
  organization_id: number;

  @ApiProperty({ default: 1 })
  role_id: number;

  @ApiProperty({ default: 1 })
  group_id?: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class UpdateUserDto {
  @ApiProperty()
  user_id?: number;

  @ApiProperty()
  last_name?: string;

  @ApiProperty()
  first_name?: string;

  @ApiProperty()
  patronymic?: string;

  @ApiProperty()
  gender_id?: number;

  @ApiProperty()
  person_status_id?: number;

  @ApiProperty()
  phone?: string;

  @ApiProperty({ default: 1 })
  organization_id?: number;

  @ApiProperty({ default: 1 })
  role_id?: number;

  @ApiProperty({ default: 1 })
  group_id?: number;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  password?: string;
}
