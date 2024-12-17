import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Validation } from './validation.entity';

@Injectable()
export class ValidationRepository extends Repository<Validation> {
  constructor(private dataSource: DataSource) {
    super(Validation, dataSource.createEntityManager());
  }
}
