import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { UserSummary } from './user-summary.entity';

@Injectable()
export class UserSummaryRepository extends Repository<UserSummary> {
  constructor(private dataSource: DataSource) {
    super(UserSummary, dataSource.createEntityManager());
  }
}
