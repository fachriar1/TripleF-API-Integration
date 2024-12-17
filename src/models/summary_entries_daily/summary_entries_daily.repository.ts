import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { SummaryEntriesDaily } from './summary_entries_daily.entity';

@Injectable()
export class SummaryEntriesDailyRepository extends Repository<SummaryEntriesDaily> {
  constructor(private dataSource: DataSource) {
    super(SummaryEntriesDaily, dataSource.createEntityManager());
  }
}
