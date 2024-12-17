import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { object } from 'joi';
import { Document } from 'mongoose';

export type UserPointDocument = UserPoint & Document;

export class User {
  id: number;
  name: string;
  sender: string;
  ktp: string;
}
let user = {
  id: { type: Number },
  name: { type: String },
  sender: { type: String },
  ktp: { type: String },
};

export class HistoryMonth {
  year: string;
  month: string;
  point: number;
}

let historyMonth = {
  year: { type: String },
  month: { type: String },
  point: { type: Number },
};

@Schema({ collection: 'user_point' })
export class UserPoint {
  @Prop({ default: 0 })
  point: number;

  @Prop({ type: user, default: null, index: { 'user.id': 1 } })
  user: User;

  @Prop({ type: [historyMonth], default: [] })
  history_month: HistoryMonth[];

  @Prop({ default: 0 })
  is_delete: number;

  @Prop({ default: 0 })
  deleted_at: Date;

  @Prop({ default: null })
  created_at: Date;

  @Prop({ default: null })
  updated_at: Date;
}

export const UserPointSchema = SchemaFactory.createForClass(UserPoint);
