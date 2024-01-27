import { OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';
import { Branch } from '../entities/branch.entity';

@Seeder({
  model: Branch,
  unique: ['branch_name'],
  containsForeignKeys: true,
  foreignDelay: 4000,
})
export class BranchSeeds implements OnSeederInit {
  run() {
    const data = [
      {
        organization_id: 1,
        branch_name: 'Филиал 1',
        location:
          '019574, Ленинградская область, город Сергиев Посад, въезд Славы, 78',
        city: 'Сергиев Посад',
      },
      {
        organization_id: 2,
        branch_name: 'Филиал 2',
        location:
          '827016, Костромская область, город Серпухов, шоссе Сталина, 89',
        city: 'Серпухов',
      },
      {
        organization_id: 3,
        branch_name: 'Филиал 3',
        location: '773161, Томская область, город Серпухов, въезд Гагарина, 16',
        city: 'Серпухов',
      },
      {
        organization_id: 4,
        branch_name: 'Филиал 4',
        location:
          '118905, Сахалинская область, город Орехово-Зуево, бульвар Чехова, 70',
        city: 'Орехово-Зуево',
      },
      {
        organization_id: 5,
        branch_name: 'Филиал 5',
        location:
          '949914, Курганская область, город Орехово-Зуево, ул. Балканская, 88',
        city: 'Орехово-Зуево',
      },
    ];
    return data;
  }
}
