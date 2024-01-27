import { OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';
import { Task } from '../entities/task.entity';

@Seeder({
  model: Task,
  unique: ['work_type'],
  containsForeignKeys: true,
})
export class TaskSeeds implements OnSeederInit {
  run() {
    const data = [
      {
        category_id: 1,
        work_type: 'Тип работы 1',
        work_type_description: 'Описание вида работы',
        task_description: 'Описание задачи',
        area: '90 кв.м.',
      },
      {
        category_id: 1,
        work_type: 'Тип работы 2',
        work_type_description: 'Описание вида работы',
        task_description: 'Описание задачи',
        area: '90 кв.м.',
      },
      {
        category_id: 1,
        work_type: 'Тип работы 3',
        work_type_description: 'Описание вида работы',
        task_description: 'Описание задачи',
        area: '90 кв.м.',
      },
      {
        category_id: 1,
        work_type: 'Тип работы 4',
        work_type_description: 'Описание вида работы',
        task_description: 'Описание задачи',
        area: '90 кв.м.',
      },
      {
        category_id: 1,
        work_type: 'Тип работы 5',
        work_type_description: 'Описание вида работы',
        task_description: 'Описание задачи',
        area: '90 кв.м.',
      },
    ];
    return data;
  }
}
