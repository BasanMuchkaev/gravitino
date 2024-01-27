import { OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';
import { Checkpoint } from '../entities/checkpoint.entity';

@Seeder({
  model: Checkpoint,
  unique: ['checkpoint_name'],
  containsForeignKeys: true,
  foreignDelay: 6000,
})
export class CheckpointSeeds implements OnSeederInit {
  run() {
    const data = [
      {
        branch_id: 1,
        checkpoint_name: 'Пункт пропуска 1',
        location:
          '019574, Ленинградская область, город Сергиев Посад, въезд Славы, 78',
        city: 'Сергиев Посад',
        working_hours: 'Круглосуточно',
        operating_mode: 'Постоянный',
      },
      {
        branch_id: 1,
        checkpoint_name: 'Пункт пропуска 2',
        location:
          '827016, Костромская область, город Серпухов, шоссе Сталина, 89',
        city: 'Серпухов',
        working_hours: 'Круглосуточно',
        operating_mode: 'Постоянный',
      },
      {
        branch_id: 1,
        checkpoint_name: 'Пункт пропуска 3',
        location: '773161, Томская область, город Серпухов, въезд Гагарина, 16',
        city: 'Серпухов',
        working_hours: 'Круглосуточно',
        operating_mode: 'Постоянный',
      },
      {
        branch_id: 1,
        checkpoint_name: 'Пункт пропуска 4',
        location:
          '118905, Сахалинская область, город Орехово-Зуево, бульвар Чехова, 70',
        city: 'Орехово-Зуево',
        working_hours: 'Круглосуточно',
        operating_mode: 'Постоянный',
      },
      {
        branch_id: 1,
        checkpoint_name: 'Пункт пропуска 5',
        location:
          '949914, Курганская область, город Орехово-Зуево, ул. Балканская, 88',
        city: 'Орехово-Зуево',
        working_hours: 'Круглосуточно',
        operating_mode: 'Постоянный',
      },
    ];
    return data;
  }
}
