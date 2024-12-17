import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { SummaryEntriesWeekly } from './summary_entries_weekly.entity';

@Injectable()
export class SummaryEntriesWeeklyRepository extends Repository<SummaryEntriesWeekly> {
  constructor(private dataSource: DataSource) {
    super(SummaryEntriesWeekly, dataSource.createEntityManager());
  }
}
