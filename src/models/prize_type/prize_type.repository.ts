import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { PrizeType } from './prize_type.entity';

@Injectable()
export class PrizeTypeRepository extends Repository<PrizeType> {
  constructor(private dataSource: DataSource) {
    super(PrizeType, dataSource.createEntityManager());
  }
}
