import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { SummaryMode } from './summary_mode.entity';

@Injectable()
export class SummaryModeRepository extends Repository<SummaryMode> {
  constructor(private dataSource: DataSource) {
    super(SummaryMode, dataSource.createEntityManager());
  }
}
