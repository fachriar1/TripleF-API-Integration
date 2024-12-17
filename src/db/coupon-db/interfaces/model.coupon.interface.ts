import { Model } from 'mongoose';
import { Coupon } from '../models/coupon.entity';

export interface CouponModel {
  Coupon: Model<Coupon>;
}
