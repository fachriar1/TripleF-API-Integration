import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { UserRankPeriode } from './user-rank_periode.entity';

@Injectable()
export class UserRankPeriodeRepository extends Repository<UserRankPeriode> {
  constructor(private dataSource: DataSource) {
    super(UserRankPeriode, dataSource.createEntityManager());
  }
}
