import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from './coupon.entity';
import { CouponRepository } from './coupon.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon])],
  providers: [CouponRepository],
  exports: [TypeOrmModule, CouponRepository],
})
export class CouponModule {}