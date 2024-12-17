import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CouponDocument = Coupon & Document;

@Schema({
  collection: 'coupon',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, // Automatically handles `created_at` and `updated_at`
})
export class Coupon {
  @Prop({ type: String, unique: true, required: true })
  coupon: string;

  @Prop({ type: Number, required: true })
  entriesId: number;

  @Prop({ type: Number, required: true })
  variantId: number;

  @Prop({ type: Number, required: true })
  prizeId: number;

  @Prop({ type: Number, default: 0 })
  status: number;

  @Prop({ type: String, required: true })
  filename: string;

  @Prop({ type: String, required: true })
  sender: string;

  @Prop({ type: Number, required: true })
  length: number;

  @Prop({ type: Date, default: null })
  use_date: Date;

  @Prop({ type: Number, default: 0 })
  is_delete: number;

  @Prop({ type: Date, default: null })
  deleted_at: Date;
}

export const CouponSchema = SchemaFactory.createForClass(Coupon);
