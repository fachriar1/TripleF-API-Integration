import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Prize } from './prize.entity';

@Injectable()
export class PrizeRepository extends Repository<Prize> {
  constructor(private dataSource: DataSource) {
    super(Prize, dataSource.createEntityManager());
  }
}
