import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { SummaryProfileWeekly } from './summary_profile_weekly.entity';

@Injectable()
export class SummaryProfileWeeklyRepository extends Repository<SummaryProfileWeekly> {
  constructor(private dataSource: DataSource) {
    super(SummaryProfileWeekly, dataSource.createEntityManager());
  }
}
