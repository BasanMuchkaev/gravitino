import { OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';
import { FileType } from '../entities/file_type.entity';

@Seeder({
  model: FileType,
  unique: ['type_name'],
})
export class FileTypeSeeds implements OnSeederInit {
  run() {
    const data = [
      {
        type_name: 'Excel',
        file_extension: 'xls',
      },
      {
        type_name: 'Picture',
        file_extension: 'png',
      },
      {
        type_name: 'Word',
        file_extension: 'docx',
      },
    ];
    return data;
  }
}
