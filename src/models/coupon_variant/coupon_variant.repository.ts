import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { CouponVariant } from './coupon_variant.entity';

@Injectable()
export class CouponVariantRepository extends Repository<CouponVariant> {
  constructor(private dataSource: DataSource) {
    super(CouponVariant, dataSource.createEntityManager());
  }
}
