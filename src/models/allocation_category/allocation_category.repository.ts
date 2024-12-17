import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { AllocationCategory } from './allocation_category.entity';

@Injectable()
export class AllocationCategoryRepository extends Repository<AllocationCategory> {
  constructor(private dataSource: DataSource) {
    super(AllocationCategory, dataSource.createEntityManager());
  }
}
