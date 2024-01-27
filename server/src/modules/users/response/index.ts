import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsString } from 'class-validator';

export class UserResponse {
  @IsInt()
  @ApiProperty()
  user_id: number;

  @IsString()
  @ApiProperty()
  last_name: string;

  @IsString()
  @ApiProperty()
  first_name: string;

  @IsString()
  @ApiProperty()
  patronymic?: string;

  @IsString()
  @ApiProperty()
  gender_id: number;

  @IsString()
  @ApiProperty()
  person_status_id: number;

  @IsString()
  @ApiProperty()
  phone: string;

  @IsInt()
  @ApiProperty({ default: 1 })
  organization_id: number;

  @IsInt()
  @ApiProperty({ default: 1 })
  role_id: number;

  @IsInt()
  @ApiProperty({ default: 1 })
  group_id?: number;

  @IsString()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;

  @IsBoolean()
  @ApiProperty()
  approved: boolean;
}

export class StatusUserResponse {
  @IsBoolean()
  @ApiProperty()
  status: boolean;
}
