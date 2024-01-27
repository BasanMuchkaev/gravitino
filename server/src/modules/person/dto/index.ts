import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonDto {
  @ApiProperty()
  last_name: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  patronymic: string;

  @ApiProperty({ default: 1 })
  gender_id: number;

  @ApiProperty({ default: 1 })
  person_status_id: number;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  property_values?: number[];
}

export class UpdatePersonDto {
  @ApiProperty()
  person_id?: number;

  @ApiProperty()
  last_name?: string;

  @ApiProperty()
  first_name?: string;

  @ApiProperty()
  patronymic?: string;

  @ApiProperty({ default: 1 })
  gender_id?: number;

  @ApiProperty({ default: 1 })
  person_status_id?: number;

  @ApiProperty()
  phone?: string;

  @ApiProperty()
  property_values?: number[];
}
