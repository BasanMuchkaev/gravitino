import { Controller, Get, UseFilters } from '@nestjs/common';
import { PersonService } from './person.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AllExceptionsFilter } from 'src/common/exception.filter';

@ApiBearerAuth()
@ApiTags('Person')
@Controller('person')
@UseFilters(AllExceptionsFilter)
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get('all')
  findAll() {
    return this.personService.findAll();
  }
}
