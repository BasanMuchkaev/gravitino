import { OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';
import { Order } from '../entities/order.entity';

@Seeder({
  model: Order,
  unique: ['task_id'],
  containsForeignKeys: true,
  foreignDelay: 20000,
})
export class OrderSeeds implements OnSeederInit {
  run() {
    const data = [
      {
        task_id: 1,
        checkpoint_id: 1,
        organization_id: 1,
        executor_id: 1,
        creator_id: 1,
        status_id: 1,
        planned_datetime: new Date('2023-01-10'),
        task_end_datetime: new Date('2023-01-10'),
        priority_id: 1,
      },
      {
        task_id: 2,
        checkpoint_id: 1,
        organization_id: 2,
        executor_id: 2,
        creator_id: 2,
        status_id: 1,
        planned_datetime: new Date('2023-01-10'),
        task_end_datetime: new Date('2023-01-10'),
        priority_id: 1,
      },
      {
        task_id: 3,
        checkpoint_id: 1,
        organization_id: 3,
        executor_id: 3,
        creator_id: 3,
        status_id: 1,
        planned_datetime: new Date('2023-01-11'),
        task_end_datetime: new Date('2023-01-11'),
        priority_id: 1,
      },
      {
        task_id: 4,
        checkpoint_id: 1,
        organization_id: 4,
        executor_id: 4,
        creator_id: 4,
        status_id: 1,
        planned_datetime: new Date('2023-01-12'),
        task_end_datetime: new Date('2023-01-12'),
        priority_id: 1,
      },
      {
        task_id: 5,
        checkpoint_id: 1,
        organization_id: 5,
        executor_id: 5,
        creator_id: 5,
        status_id: 1,
        planned_datetime: new Date('2023-01-13'),
        task_end_datetime: new Date('2023-01-13'),
        priority_id: 1,
      },
    ];
    return data;
  }
}
