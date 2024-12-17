import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { BlackList } from './black_list.entity';

@Injectable()
export class BlackListRepository extends Repository<BlackList> {
  constructor(private dataSource: DataSource) {
    super(BlackList, dataSource.createEntityManager());
  }
}
