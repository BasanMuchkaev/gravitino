import { OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';
import { OrderStatus } from '../entities/order_status.entity';

@Seeder({
  model: OrderStatus,
  unique: ['status_name'],
})
export class OrderStatusSeeds implements OnSeederInit {
  run() {
    const data = [
      {
        status_name: 'Не принят',
      },
      {
        status_name: 'В работе',
      },
      {
        status_name: 'Выполнен',
      },
    ];
    return data;
  }
}
