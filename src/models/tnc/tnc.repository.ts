import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Tnc } from './tnc.entity';

@Injectable()
export class TncRepository extends Repository<Tnc> {
  constructor(private dataSource: DataSource) {
    super(Tnc, dataSource.createEntityManager());
  }
}
