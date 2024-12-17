import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Introduction } from './introduction.entity';

@Injectable()
export class IntroductionRepository extends Repository<Introduction> {
  constructor(private dataSource: DataSource) {
    super(Introduction, dataSource.createEntityManager());
  }
}
