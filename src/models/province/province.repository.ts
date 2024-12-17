import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Province } from './province.entity';

@Injectable()
export class ProvinceRepository extends Repository<Province> {
  constructor(private dataSource: DataSource) {
    super(Province, dataSource.createEntityManager());
  }
}
