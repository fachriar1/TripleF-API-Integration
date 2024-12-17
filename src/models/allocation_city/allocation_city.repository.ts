import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { AllocationCity } from './allocation_city.entity';

@Injectable()
export class AllocationCityRepository extends Repository<AllocationCity> {
  constructor(private dataSource: DataSource) {
    super(AllocationCity, dataSource.createEntityManager());
  }
}
