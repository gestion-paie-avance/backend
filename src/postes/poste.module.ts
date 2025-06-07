import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Poste } from './entities/poste.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Poste])],
  exports: [TypeOrmModule], 
})
export class PostesModule {}
