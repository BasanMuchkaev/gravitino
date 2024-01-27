import { ApiProperty } from '@nestjs/swagger';

export class CreateRolesPermissionDto {
  @ApiProperty()
  role_id: number;

  @ApiProperty()
  permission_id: number;

  @ApiProperty()
  rights: boolean;
}

export class UpdateRolesPermissionDto {
  @ApiProperty()
  role_permission_id?: number;

  @ApiProperty()
  role_id?: number;

  @ApiProperty()
  permission_id?: number;

  @ApiProperty()
  rights?: boolean;
}
