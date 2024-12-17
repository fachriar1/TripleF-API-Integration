import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Index,
  OneToOne,
} from 'typeorm';
import { Prize } from '../prize/prize.entity';
import { Store } from '../store/store.entity';
import { UserMobile } from '../user_mobile/user_mobile.entity';
import { Winner } from '../winner/winner.entity';
@Entity()
export class Coupon {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => Winner, (item) => item.coupon)
  winner: Winner;

  @ManyToOne(() => Store, (store) => store.id)
  store: Store;
  @Column({ default: null, nullable: true })
  storeId: number;

  @Column({ type: 'smallint', default: 0 })
  status: number;

  @Column({ type: 'varchar', unique: true, length: 20, default: '' })
  code: string;

  @Column({ type: 'varchar', unique: true, length: 20, default: '' })
  serial_number: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  url: string;

  @Column({ type: 'int', default: 0 })
  type: number;

  @Index()
  @Column({ type: 'int', default: 0 })
  prizeId: number;
  prize: Prize;

  @CreateDateColumn({ type: 'timestamp' })
  used_date: string;

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
