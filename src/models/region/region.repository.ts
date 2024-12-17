import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Regions } from './region.entity';

@Injectable()
export class RegionRepository extends Repository<Regions> {
  constructor(private dataSource: DataSource) {
    super(Regions, dataSource.createEntityManager());
  }
}
