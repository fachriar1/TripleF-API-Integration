import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Sales } from './sales.entity';

@Injectable()
export class SalesRepository extends Repository<Sales> {
  constructor(private dataSource: DataSource) {
    super(Sales, dataSource.createEntityManager());
  }
}
