import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { Allocation } from '../allocation/allocation.entity';
import { Coupon } from '../coupon/coupon.entity';
import { Entries } from '../entries/entries.entity';
import { Sales } from '../sales/sales.entity';
import { StoreArea } from '../store_area/store_area.entity';
import { Users } from '../user/user.entity';

import { UserMobile } from '../user_mobile/user_mobile.entity';
@Entity()
export class Store {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => Users, (users) => users.store)
  users: Users;

  @OneToMany(() => Entries, (entries) => entries.store)
  entries: Entries[];

  @OneToMany(() => Coupon, (coupon) => coupon.store)
  coupons: Coupon[];

  @OneToMany(() => Allocation, (allocation) => allocation.store)
  allocations: Allocation[];

  @ManyToOne(() => Sales, (sales) => sales.id)
  sales: Sales;
  @Column({ default: null, nullable: true })
  salesId: number;

  @ManyToOne(() => StoreArea, (storeArea) => storeArea.id)
  area: StoreArea;
  @Column({ default: null, nullable: true })
  areaId: number;

  @Column({ type: 'varchar', length: 255, default: '' })
  name: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  code: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  province: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  city: string;

  @Column({ type: 'smallint', default: 1, comment: '0->in active,1-> active' })
  status: number;

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
