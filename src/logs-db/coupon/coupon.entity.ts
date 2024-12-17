import {
  Entity,
  ObjectId,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Coupon {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ unique: true })
  coupon: string;

  @Column()
  entriesId: number;

  @Column()
  prizeId: number;

  @Column()
  status: number;

  @Column()
  filename: string;

  @Column()
  sender: string;

  @Column()
  length: number;

  @Column({ type: 'timestamp' })
  use_date: Date;

  @Column()
  is_delete: number;

  @Column({ type: 'timestamp' })
  deleted_at: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
