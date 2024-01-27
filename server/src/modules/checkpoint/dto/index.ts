import { ApiProperty } from '@nestjs/swagger';

export class CreateCheckpointDto {
  @ApiProperty({ default: 1 })
  organization_id: number;

  @ApiProperty({ default: 1 })
  branch_id: number;

  @ApiProperty()
  checkpoint_name: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  working_hours?: string;

  @ApiProperty()
  operating_mode?: string;

  @ApiProperty()
  property_values?: number[];
}

export class UpdateCheckpointDto {
  @ApiProperty({ default: 1 })
  checkpoint_id?: number;

  @ApiProperty({ default: 1 })
  branch_id?: number;

  @ApiProperty()
  checkpoint_name?: string;

  @ApiProperty()
  location?: string;

  @ApiProperty()
  city?: string;

  @ApiProperty()
  working_hours?: string;

  @ApiProperty()
  operating_mode?: string;

  @ApiProperty()
  property_values?: number[];
}
