import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Zipcode } from './zipcode.entity';

@Injectable()
export class ZipcodeRepository extends Repository<Zipcode> {
  constructor(private dataSource: DataSource) {
    super(Zipcode, dataSource.createEntityManager());
  }
}
