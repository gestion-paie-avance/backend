import { Module } from '@nestjs/common';
import { EmployerService } from './employer.service';
import { EmployerController } from './employer.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { request } from 'http';
import { Poste } from 'src/postes/entities/poste.entity';
import { Departement } from 'src/postes/entities/departement.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employer } from './entities/employer.entity';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './storage/uploads/profile_files',
        filename: (request,file , cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        }
      })
    }),
    TypeOrmModule.forFeature([Employer,Poste,Departement])
  ],
  controllers: [EmployerController],
  exports: [TypeOrmModule], 
  providers: [EmployerService],
})
export class EmployerModule {}
