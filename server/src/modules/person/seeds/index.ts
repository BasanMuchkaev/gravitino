import { OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';
import { Person } from '../entities/person.entity';
@Seeder({
  model: Person,
  unique: ['phone'],
  containsForeignKeys: true,
})
export class PersonSeeds implements OnSeederInit {
  run() {
    const data = [
      {
        last_name: 'Иванов',
        first_name: 'Иван',
        patronymic: 'Иванович',
        gender_id: 1,
        phone: '+79001234567',
        person_status_id: 1,
      },
      {
        last_name: 'Панов',
        first_name: 'Дмитрий',
        patronymic: 'Георгиевич',
        gender_id: 1,
        phone: '+79007976431',
        person_status_id: 1,
      },
      {
        last_name: 'Попов',
        first_name: 'Виктор',
        patronymic: 'Михайлович',
        gender_id: 1,
        phone: '+79007895498',
        person_status_id: 2,
      },
      {
        last_name: 'Быкова',
        first_name: 'Екатерина',
        patronymic: 'Захаровна',
        gender_id: 2,
        phone: '+78004596587',
        person_status_id: 1,
      },
      {
        last_name: 'Сергеев',
        first_name: 'Артём',
        patronymic: 'Иванович',
        gender_id: 1,
        phone: '+77778756532',
        person_status_id: 3,
      },
    ];
    return data;
  }
}
