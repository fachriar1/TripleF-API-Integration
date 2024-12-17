import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { SummaryEntriesMonthly } from './summary_entries_monthly.entity';

@Injectable()
export class SummaryEntriesMonthlyRepository extends Repository<SummaryEntriesMonthly> {
  constructor(private dataSource: DataSource) {
    super(SummaryEntriesMonthly, dataSource.createEntityManager());
  }
}
