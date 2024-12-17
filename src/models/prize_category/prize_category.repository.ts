import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { PrizeCategory } from './prize_category.entity';

@Injectable()
export class PrizeCategoryRepository extends Repository<PrizeCategory> {
  constructor(private dataSource: DataSource) {
    super(PrizeCategory, dataSource.createEntityManager());
  }
}
