import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Poste } from './entities/poste.entity';
import { PosteController } from './poste.controller';
import { PosteService } from './poste.service';

@Module({
  imports: [TypeOrmModule.forFeature([Poste])],
  exports: [TypeOrmModule], 
  controllers: [PosteController],
  providers: [PosteService]
})
export class PostesModule {}
