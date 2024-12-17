import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Faq } from './faq.entity';

@Injectable()
export class FaqRepository extends Repository<Faq> {
  constructor(private dataSource: DataSource) {
    super(Faq, dataSource.createEntityManager());
  }
}
