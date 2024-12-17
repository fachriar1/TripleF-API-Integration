import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { District } from './district.entity';

@Injectable()
export class DistrictRepository extends Repository<District> {
  constructor(private dataSource: DataSource) {
    super(District, dataSource.createEntityManager());
  }
}
