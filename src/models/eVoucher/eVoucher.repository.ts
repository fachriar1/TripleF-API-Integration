import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Voucher } from './eVoucher.entity';

@Injectable()
export class VoucherRepository extends Repository<Voucher> {
  constructor(private dataSource: DataSource) {
    super(Voucher, dataSource.createEntityManager());
  }
}
