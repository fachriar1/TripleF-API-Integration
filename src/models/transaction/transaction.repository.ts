import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionRepository extends Repository<Transaction> {
  constructor(private dataSource: DataSource) {
    super(Transaction, dataSource.createEntityManager());
  }
}
