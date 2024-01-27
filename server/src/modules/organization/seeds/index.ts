import { OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';
import { Organization } from '../entities/organization.entity';

@Seeder({
  model: Organization,
  unique: ['full_name'],
  containsForeignKeys: true,
})
export class OrganizationSeeds implements OnSeederInit {
  run() {
    const data = [
      {
        organization_type_id: 1,
        full_name: 'ООО "Компания 1"',
        short_name: 'Компания 1',
        register_number: '124854464',
        bic: '583652448',
        phone: '+79951692544',
        address:
          '628614, Ульяновская область, город Дорохово, наб. Гагарина, 71',
        email: 'company1@mail.com',
        ogrn: '6909837484484',
        inn: '9975454057',
        kpp: '864761901',
        okpo: '50235599',
      },
      {
        organization_type_id: 1,
        full_name: 'ООО "Компания 2"',
        short_name: 'Компания 2',
        register_number: '154156652',
        bic: '50235599',
        phone: '+79517522363',
        address:
          '170401, Пензенская область, город Солнечногорск, пр. Чехова, 47',
        email: 'company2@mail.com',
        ogrn: '1253898877539',
        inn: '5727900966',
        kpp: '891566961',
        okpo: '50235599',
      },
      {
        organization_type_id: 1,
        full_name: 'ООО "Компания 3"',
        short_name: 'Компания 3',
        register_number: '2125313213',
        bic: '374606552',
        phone: '+79327544163',
        address:
          '026170, Воронежская область, город Орехово-Зуево, шоссе Косиора, 44',
        email: 'company3@mail.com',
        ogrn: '5616351228455',
        inn: '0390201278',
        kpp: '705374212',
        okpo: '50235599',
      },
      {
        organization_type_id: 1,
        full_name: 'ООО "Компания 4"',
        short_name: 'Компания 4',
        register_number: '212122134',
        bic: '251490211',
        phone: '+79354944154',
        address:
          '883072, Курганская область, город Чехов, спуск Будапештсткая, 77',
        email: 'company4@mail.com',
        ogrn: '6927890723831',
        inn: '0436981520',
        kpp: '183212273',
        okpo: '50235599',
      },
      {
        organization_type_id: 1,
        full_name: 'ИП Иванов',
        short_name: 'ИП Иванов',
        register_number: '848486848',
        bic: '717688668',
        phone: '+79587944132',
        address: '826840, Магаданская область, город Клин, пр. Гоголя, 06',
        email: 'ivanov.i@mail.com',
        ogrn: '2042493132086',
        inn: '863318636668',
        kpp: '645033119',
        okpo: '50235599',
      },
    ];
    return data;
  }
}
