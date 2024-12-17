import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { UserRank } from './user-rank.entity';

@Injectable()
export class UserRankRepository extends Repository<UserRank> {
  constructor(private dataSource: DataSource) {
    super(UserRank, dataSource.createEntityManager());
  }
}
