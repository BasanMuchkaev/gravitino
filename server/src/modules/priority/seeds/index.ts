import { OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';
import { OrderPriority } from '../entities/priority.entity';

@Seeder({
  model: OrderPriority,
  unique: ['priority_name'],
})
export class OrderPrioritySeeds implements OnSeederInit {
  run() {
    const data = [
      {
        priority_name: 'Ежедневно',
      },
      {
        priority_name: 'Еженедельно',
      },
      {
        priority_name: 'Ежемесячно',
      },
      {
        priority_name: 'Ежегодно',
      },
    ];
    return data;
  }
}
