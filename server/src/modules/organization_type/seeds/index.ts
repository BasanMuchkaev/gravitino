import { OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';
import { OrganizationType } from '../entities/organization_type.entity';

@Seeder({
  model: OrganizationType,
  unique: ['type_name'],
})
export class OrganizationTypeSeeds implements OnSeederInit {
  run() {
    const data = [
      {
        type_name: 'Подрядчик',
      },
      {
        type_name: 'Заказчик',
      },
      {
        type_name: 'Исполнитель',
      },
    ];
    return data;
  }
}
