import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Access } from './access.entity';

@Injectable()
export class AccessRepository extends Repository<Access> {
  constructor(private dataSource: DataSource) {
    super(Access, dataSource.createEntityManager());
  }
}
