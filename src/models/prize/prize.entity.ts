import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Allocation } from '../allocation/allocation.entity';
import { Voucher } from '../eVoucher/eVoucher.entity';
import { PrizeCategory } from '../prize_category/prize_category.entity';
import { PrizeSetting } from '../prize_setting/prize_setting.entity';
import { PrizeType } from '../prize_type/prize_type.entity';
import { Winner } from '../winner/winner.entity';
import { UserMobile } from '../user_mobile/user_mobile.entity';
import { Notification } from '../notification/notification.entity';
@Entity()
export class Prize {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => PrizeSetting, (setting) => setting.prize)
  setting: PrizeSetting;

  @OneToMany(() => Winner, (winner) => winner.prize)
  winners: Winner[];

  @OneToMany(() => Notification, (item) => item.prize)
  notification: Notification[];

  @OneToMany(() => Allocation, (allocation) => allocation.prize)
  allocations: Allocation[];

  @ManyToOne(() => PrizeCategory, (prizeCategory) => prizeCategory.id)
  category: PrizeCategory;

  @ManyToOne(() => Voucher, (voucher) => voucher.id)
  voucher: Voucher;
  @Column({ default: null, nullable: true })
  voucherId: number;

  @ManyToOne(() => PrizeType, (prizeType) => prizeType.id)
  type: PrizeType;
  @Column({ default: null, nullable: true })
  typeId: number;

  @Column({ type: 'varchar', length: 255, default: '' })
  name: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  name_sub: string;

  @Column({ type: 'smallint', comment: '0:inactive,1:active' })
  status: number;

  @Column({ type: 'varchar', length: 255, default: '' })
  picture: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  textUrl: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  amount: string;

  @Column({
    type: 'varchar',
    length: 255,
    default: '',
    comment: "delimit using comma ',' ",
  })
  codes: string;

  @Column({ type: 'text' })
  prize_reply: string;

  @Column({ type: 'text' })
  history_desc: string;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  @Column({
    type: 'smallint',
    default: 0,
    comment: '1-> mobilepulsa, 2-> iris, 3-> fisik',
  })
  topupType: number;

  @Column({ type: 'int', default: 0 })
  sort: number;

  @Column({ type: 'int', default: 0 })
  point: number;

  @Column({
    type: 'smallint',
    default: 0,
    comment: '0->tidak perlu ditopup,1->perlu ditopup',
  })
  isTopup: number;

  @Column({ type: 'smallint', default: 0 })
  is_deleted: number;

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

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: string;
}
