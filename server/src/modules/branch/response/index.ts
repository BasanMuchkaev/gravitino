import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsString } from 'class-validator';

export class BranchResponse {
  @IsInt()
  @ApiProperty({ default: 1 })
  branch_id: number;

  @IsInt()
  @ApiProperty({ default: 1 })
  organization_id: number;

  @IsString()
  @ApiProperty()
  branch_name: string;

  @IsString()
  @ApiProperty()
  location: string;

  @IsString()
  @ApiProperty()
  city: string;
}

export class StatusBranchResponse {
  @IsBoolean()
  @ApiProperty()
  status: boolean;
}
