import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './news.entity';
import { NewsRepository } from './news.repository';

@Module({
  imports: [TypeOrmModule.forFeature([News])],
  providers: [NewsRepository],
  exports: [TypeOrmModule, NewsRepository],
})
export class NewsModule {}
