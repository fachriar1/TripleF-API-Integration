import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Coupon } from './coupon.entity';

@Injectable()
export class CouponRepository extends Repository<Coupon> {
  constructor(private dataSource: DataSource) {
    super(Coupon, dataSource.createEntityManager());
  }
}
