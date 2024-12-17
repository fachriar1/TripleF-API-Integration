import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { StoreArea } from './store_area.entity';

@Injectable()
export class StoreAreaRepository extends Repository<StoreArea> {
  constructor(private dataSource: DataSource) {
    super(StoreArea, dataSource.createEntityManager());
  }
}
