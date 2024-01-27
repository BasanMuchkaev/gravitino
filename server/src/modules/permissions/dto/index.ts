import { ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
  @ApiProperty()
  permission_id: number;

  @ApiProperty()
  permission_sku: string;

  @ApiProperty()
  permission_name: string;

  @ApiProperty()
  permission_description: string;

  @ApiProperty()
  entity_name: string;
}

export class UpdatePermissionDto {
  @ApiProperty()
  permission_id: number;

  @ApiProperty()
  permission_sku?: string;

  @ApiProperty()
  permission_name?: string;

  @ApiProperty()
  permission_description?: string;

  @ApiProperty()
  entity_name?: string;
}
