import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { InvalidReason } from './invalid_reason.entity';

@Injectable()
export class InvalidReasonRepository extends Repository<InvalidReason> {
  constructor(private dataSource: DataSource) {
    super(InvalidReason, dataSource.createEntityManager());
  }
}
