import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { SummaryProfileDaily } from './summary_profile_daily.entity';

@Injectable()
export class SummaryProfileDailyRepository extends Repository<SummaryProfileDaily> {
  constructor(private dataSource: DataSource) {
    super(SummaryProfileDaily, dataSource.createEntityManager());
  }
}
