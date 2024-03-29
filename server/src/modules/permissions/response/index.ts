import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean } from 'class-validator';

export class PermissionResponse {
  @IsString()
  @ApiProperty()
  permission_id: number;

  @IsString()
  @ApiProperty()
  permission_sku: string;

  @IsString()
  @ApiProperty()
  permission_name: string;

  @IsString()
  @ApiProperty()
  permission_description: string;

  @IsString()
  @ApiProperty()
  entity_name: string;
}

export class StatusPermissionResponse {
  @IsBoolean()
  @ApiProperty()
  status: boolean;
}
