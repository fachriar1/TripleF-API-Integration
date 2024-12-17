import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { EntriesVariant } from './entries_variant.entity';

@Injectable()
export class EntriesVariantRepository extends Repository<EntriesVariant> {
  constructor(private dataSource: DataSource) {
    super(EntriesVariant, dataSource.createEntityManager());
  }
}
