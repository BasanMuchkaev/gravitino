import { OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';
import { Gender } from '../entities/gender.entity';

@Seeder({
    model: Gender,
    unique: ['gender_name'],
})
export class GenderSeeds implements OnSeederInit {
    run() {
        const data = [
            {
                gender_id: 1,
                gender_name: 'Мужской'
            },
            {
                gender_id: 2,
                gender_name: 'Женский'
            }
        ];
        return data;
    }
}