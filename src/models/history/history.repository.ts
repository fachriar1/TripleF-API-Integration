import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { History } from './history.entity';

@Injectable()
export class HistoryRepository extends Repository<History> {
  constructor(private dataSource: DataSource) {
    super(History, dataSource.createEntityManager());
  }
}
