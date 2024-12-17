import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { SummaryProfileMonthly } from './summary_profile_monthly.entity';

@Injectable()
export class SummaryProfileMonthlyRepository extends Repository<SummaryProfileMonthly> {
  constructor(private dataSource: DataSource) {
    super(SummaryProfileMonthly, dataSource.createEntityManager());
  }
}
