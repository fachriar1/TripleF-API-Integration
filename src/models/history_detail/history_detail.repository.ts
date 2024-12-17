import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { HistoryDetail } from './history_detail.entity';

@Injectable()
export class HistoryDetailRepository extends Repository<HistoryDetail> {
  constructor(private dataSource: DataSource) {
    super(HistoryDetail, dataSource.createEntityManager());
  }
}
