import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponType } from './coupon_type.entity';
import { CouponTypeRepository } from './coupon_type.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CouponType])],
  providers: [CouponTypeRepository],
  exports: [TypeOrmModule, CouponTypeRepository],
})
export class CouponTypeModule {}
