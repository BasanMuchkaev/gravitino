import { ApiProperty } from '@nestjs/swagger';

export class CreateBranchDto {
  @ApiProperty({ default: 1 })
  organization_id: number;

  @ApiProperty()
  branch_name: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  city: string;
}

export class UpdateBranchDto {
  @ApiProperty({ default: 1 })
  branch_id?: number;

  @ApiProperty({ default: 1 })
  organization_id?: number;

  @ApiProperty()
  branch_name?: string;

  @ApiProperty()
  location?: string;

  @ApiProperty()
  city?: string;
}
