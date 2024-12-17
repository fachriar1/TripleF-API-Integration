import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { CouponType } from './coupon_type.entity';

@Injectable()
export class CouponTypeRepository extends Repository<CouponType> {
  constructor(private dataSource: DataSource) {
    super(CouponType, dataSource.createEntityManager());
  }
}
