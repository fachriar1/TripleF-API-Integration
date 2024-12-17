import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Allocation } from './allocation.entity';

@Injectable()
export class AllocationRepository extends Repository<Allocation> {
  constructor(private dataSource: DataSource) {
    super(Allocation, dataSource.createEntityManager());
  }
}
