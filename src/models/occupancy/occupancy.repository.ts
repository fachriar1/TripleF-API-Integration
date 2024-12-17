import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Occupancy } from './occupancy.entity';

@Injectable()
export class OccupancyRepository extends Repository<Occupancy> {
  constructor(private dataSource: DataSource) {
    super(Occupancy, dataSource.createEntityManager());
  }
}
