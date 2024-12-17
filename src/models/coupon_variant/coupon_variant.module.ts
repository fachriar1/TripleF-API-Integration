import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponVariant } from './coupon_variant.entity';
import { CouponVariantRepository } from './coupon_variant.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CouponVariant])],
  providers: [CouponVariantRepository],
  exports: [TypeOrmModule, CouponVariantRepository],
})
export class CouponVariantModule {}
