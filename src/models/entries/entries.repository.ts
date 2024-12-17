import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Entries } from './entries.entity';

@Injectable()
export class EntriesRepository extends Repository<Entries> {
  constructor(private dataSource: DataSource) {
    super(Entries, dataSource.createEntityManager());
  }
}
