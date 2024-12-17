import { Injectable, Inject } from '@nestjs/common';
import { CouponDBModel } from './interfaces/model.interface';
import { CouponModel } from './interfaces/model.coupon.interface';

@Injectable()
export class CouponDbService {
  constructor(@Inject('COUPON_MODEL') private couponModel: CouponModel) {}

  getCouponDbModels(): CouponDBModel {
    return {
      Coupon: this.couponModel,
    };
  }
}
