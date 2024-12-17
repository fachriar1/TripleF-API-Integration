import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { Allocation } from '../allocation/allocation.entity';
import { Prize } from '../prize/prize.entity';
import { Transaction } from '../transaction/transaction.entity';
import { Users } from '../user/user.entity';
import { Voucher } from '../eVoucher/eVoucher.entity';
import { Entries } from '../entries/entries.entity';
import { MasterBrand } from '../master_brand/master_brand.entity';
import { History } from '../history/history.entity';
import { InvalidReason } from '../invalid_reason/invalid_reason.entity';
import { UserMobile } from '../user_mobile/user_mobile.entity';
import { Coupon } from '../coupon/coupon.entity';
@Entity()
export class Winner {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToMany(() => History, (history) => history.winner)
  history: History[];

  @OneToMany(() => Transaction, (transaction) => transaction.winner)
  transactions: Transaction[];

  @OneToOne(() => Coupon, (Coupon) => Coupon.id)
  coupon: Coupon;
  @Index()
  @Column({ default: null, nullable: true })
  couponId: number;

  @OneToOne(() => Allocation, (allocation) => allocation.id)
  @JoinColumn()
  allocation: Allocation;
  @Index()
  @Column({ default: null, nullable: true })
  allocationId: number;

  @ManyToOne(() => Prize, (prize) => prize.id)
  prize: Prize;
  @Index()
  @Column({ default: null, nullable: true })
  prizeId: number;

  @ManyToOne(() => Voucher, (voucher) => voucher.id)
  voucher: Voucher;
  @Column({ default: null, nullable: true })
  voucherId: number;

  @ManyToOne(() => Users, (user) => user.id)
  user: Users;
  @Index()
  @Column({ default: null, nullable: true })
  userId: number;

  @ManyToOne(() => MasterBrand, (masterBrand) => masterBrand.id)
  masterBrand: MasterBrand;
  @Column({ default: null, nullable: true })
  masterBrandId: string;

  @ManyToOne(() => InvalidReason, (invalidReason) => invalidReason.id)
  invalidReason: InvalidReason;
  @Column({ default: null, nullable: true })
  invalidReasonId: number;

  @OneToOne(() => Entries, (entries) => entries.id)
  @JoinColumn()
  entries: Entries;
  @Index()
  @Column({ default: null, nullable: true })
  entriesId: number;

  @Column({
    type: 'smallint',
    default: 0,
    comment: '0->failed, 1->on process, 2->success, 3->pengiriman, 4->diterima',
  })
  status: number;

  @Column({ type: 'int', default: 1, comment: 'total loop topup' })
  total: number;

  @Column({ type: 'int', default: 0, comment: 'Late send image' })
  is_late: number;

  @Column({ type: 'int', default: 0, comment: 'Push notif' })
  is_push: number;

  @Index()
  @Column({ type: 'varchar', length: 50 })
  account_number: string;

  @Column({ type: 'varchar', length: 255 })
  code_topup: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: '0',
    comment: 'amount for topup',
  })
  amount: string;

  @Column({ type: 'smallint', default: 0 })
  is_deleted: number;

  @Column({ type: 'smallint', default: 0 })
  is_approved: number;

  @Column({
    type: 'smallint',
    default: 0,
    comment:
      '1->mobile pulsa, 2->iris, 3->fisik,4->submit code unik valid,5->kupon undian',
  })
  type: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'NULL',
    nullable: true,
  })
  shipped_process_date: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'NULL',
    nullable: true,
  })
  shipped_date: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'NULL',
    nullable: true,
  })
  shipped_received_date: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'NULL',
    nullable: true,
  })
  deleted_at: string;

  @ManyToOne(() => UserMobile, (user) => user.id)
  createdBy: UserMobile;
  @Column({ default: null, nullable: true })
  createdById: number;

  @ManyToOne(() => UserMobile, (user) => user.id)
  updatedBy: UserMobile;
  @Column({ default: null, nullable: true })
  updatedById: number;

  @ManyToOne(() => UserMobile, (user) => user.id)
  deletedBy: UserMobile;
  @Column({ default: null, nullable: true })
  deletedById: number;

  @Index()
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: string;
}
