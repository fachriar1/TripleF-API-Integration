import { Module } from '@nestjs/common';
import { CouponDbService } from './coupon-db.service';
import { CouponDbConfigModule } from '@common/config/coupon-db/config.module';
import { CouponDbConfigService } from '@common/config/coupon-db/config.service';
import { baseModelProviders } from './models/model.base.provider';
import { CouponDBProvider } from './coupon-db.provider';

@Module({
  imports: [CouponDbConfigModule],
  providers: [
    CouponDbService,
    CouponDbConfigService,
    ...baseModelProviders,
    ...CouponDBProvider,
  ],
  exports: [CouponDbService, ...baseModelProviders, ...CouponDBProvider],
})
export class CouponDbModule {}
