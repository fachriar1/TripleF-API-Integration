import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { MasterBrand } from './master_brand.entity';

@Injectable()
export class MasterBrandRepository extends Repository<MasterBrand> {
  constructor(private dataSource: DataSource) {
    super(MasterBrand, dataSource.createEntityManager());
  }
}
