import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { PrefixPulsa } from './prefix_pulsa.entity';

@Injectable()
export class PrefixPulsaRepository extends Repository<PrefixPulsa> {
  constructor(private dataSource: DataSource) {
    super(PrefixPulsa, dataSource.createEntityManager());
  }
}
