import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { News } from './news.entity';

@Injectable()
export class NewsRepository extends Repository<News> {
  constructor(private dataSource: DataSource) {
    super(News, dataSource.createEntityManager());
  }
}
