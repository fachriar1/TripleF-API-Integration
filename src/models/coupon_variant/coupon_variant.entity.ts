import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { CouponType } from '../coupon_type/coupon_type.entity';
import { Users } from '../user/user.entity';
@Entity()
export class CouponVariant {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => CouponType, (couponType) => couponType.id)
  couponType: CouponType;
  @Index()
  @Column({ default: null, nullable: true })
  couponTypeId: number;

  @Column({ type: 'varchar', default: '' })
  description: string;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @Column({ type: 'int', default: 0 })
  point: number;

  @Column({ type: 'smallint', default: 0 })
  status: number;

  @Column({ type: 'int', default: 0 })
  type: number;

  @Column({ type: 'smallint', default: 0 })
  is_deleted: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'NULL',
    nullable: true,
  })
  deleted_at: string;

  @ManyToOne(() => Users, (user) => user.id)
  createdBy: Users;
  @Column({ default: null, nullable: true })
  createdById: number;

  @ManyToOne(() => Users, (user) => user.id)
  updatedBy: Users;
  @Column({ default: null, nullable: true })
  updatedById: number;

  @ManyToOne(() => Users, (user) => user.id)
  deletedBy: Users;
  @Column({ default: null, nullable: true })
  deletedById: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: string;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: string;
}
