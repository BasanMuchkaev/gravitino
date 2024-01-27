import { OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';
import { PersonStatus } from '../entities/person_status.entity';

@Seeder({
    model: PersonStatus,
    unique: ['person_status_name'],
})
export class PersonStatusSeeds implements OnSeederInit {
    run() {
        const data = [
            {
                person_status_id: 1,
                person_status_name: 'Активен',
            },
            {
                person_status_id: 2,
                person_status_name: 'Заблокирован',
            },
            {
                person_status_id: 3,
                person_status_name: 'На подтверждении',
            }
        ];
        return data;
    }
}