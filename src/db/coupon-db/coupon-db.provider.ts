import { CouponDbConfigService } from '@common/config/coupon-db/config.service';
import { createConnection } from 'mongoose';

export const CouponDBProvider = [
  {
    provide: 'COUPON_DB_CONNECTION',
    inject: [CouponDbConfigService],
    useFactory: async (CouponDbConfigService: CouponDbConfigService) =>
      await createConnection(CouponDbConfigService.typeORMConfig, {
        directConnection: true,
      }),
  },
];
