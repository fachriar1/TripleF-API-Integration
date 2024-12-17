import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { WhiteList } from './white_list.entity';

@Injectable()
export class WhiteListRepository extends Repository<WhiteList> {
  constructor(private dataSource: DataSource) {
    super(WhiteList, dataSource.createEntityManager());
  }
}
