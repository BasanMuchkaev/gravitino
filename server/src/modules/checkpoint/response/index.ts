import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsString } from 'class-validator';

export class CheckpointResponse {
  @IsInt()
  @ApiProperty({ default: 1 })
  checkpoint_id: number;

  @ApiProperty({ default: 1 })
  branch_id: number;

  @IsString()
  @ApiProperty()
  checkpoint_name: string;

  @IsString()
  @ApiProperty()
  location: string;

  @IsString()
  @ApiProperty()
  city: string;

  @ApiProperty()
  working_hours?: string;

  @ApiProperty()
  operating_mode?: string;

  @ApiProperty()
  property_values?: number[];
}

export class StatusCheckpointResponse {
  @IsBoolean()
  @ApiProperty()
  status: boolean;
}
