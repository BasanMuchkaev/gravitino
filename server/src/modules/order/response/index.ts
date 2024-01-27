import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsInt, IsString } from 'class-validator';

export class OrderResponse {
  @IsInt()
  @ApiProperty({ default: 1 })
  task_id?: number;

  @IsString()
  @ApiProperty()
  task_name?: string;

  @IsString()
  @ApiProperty()
  task_description?: string;

  @IsInt()
  @ApiProperty({ default: 1 })
  checkpoint_id: number;

  @IsInt()
  @ApiProperty({ default: 1 })
  organization_id: number;

  @IsInt()
  @ApiProperty({ default: 1 })
  executor_id: number;

  @IsInt()
  @ApiProperty({ default: 1 })
  creator_id: number;

  @IsInt()
  @ApiProperty({ default: 1 })
  status_id: number;

  @IsDate()
  @ApiProperty()
  planned_datetime: Date;

  @IsDate()
  @ApiProperty()
  task_end_datetime: Date;

  @IsInt()
  @ApiProperty({ default: 1 })
  priority_id: number;

  @ApiProperty()
  property_values?: number[];
}

export class StatusOrderResponse {
  @IsBoolean()
  @ApiProperty()
  status: boolean;
}
