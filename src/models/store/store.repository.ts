import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Store } from './store.entity';

@Injectable()
export class StoreRepository extends Repository<Store> {
  constructor(private dataSource: DataSource) {
    super(Store, dataSource.createEntityManager());
  }
}
