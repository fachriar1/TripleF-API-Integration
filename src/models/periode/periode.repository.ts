import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Periode } from './periode.entity';

@Injectable()
export class PeriodeRepository extends Repository<Periode> {
  constructor(private dataSource: DataSource) {
    super(Periode, dataSource.createEntityManager());
  }
}
