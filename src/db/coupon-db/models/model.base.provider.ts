import { Connection } from 'mongoose';
import { CouponSchema } from './coupon.entity';

export const baseModelProviders = [
  {
    provide: 'COUPON_MODEL',
    useFactory: (connection: Connection) => {
      return {
        Coupon: connection.model('Coupon', CouponSchema),
      };
    },
    inject: ['COUPON_DB_CONNECTION'],
  },
];
