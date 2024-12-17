import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
  Index,
} from 'typeorm';
import { AllocationCategory } from '../allocation_category/allocation_category.entity';
import { Prize } from '../prize/prize.entity';
import { Regions } from '../region/region.entity';
import { Store } from '../store/store.entity';
import { Winner } from '../winner/winner.entity';
import { UserMobile } from '../user_mobile/user_mobile.entity';
@Entity()
export class Allocation {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => Winner, (winner) => winner.allocation)
  winner: Winner;

  @ManyToOne(() => Prize, (prize) => prize.id)
  prize: Prize;
  @Index()
  @Column({ default: null, nullable: true })
  prizeId: number;

  @ManyToOne(
    () => AllocationCategory,
    (allocationCategory) => allocationCategory.id,
  )
  category: AllocationCategory;
  @Index()
  @Column({ default: null, nullable: true })
  categoryId: number;

  @ManyToOne(() => Store, (store) => store.id)
  store: Store;
  @Column({ default: null, nullable: true })
  storeId: number;

  @ManyToOne(() => Regions, (region) => region.id)
  region: Regions;
  @Index()
  @Column({ default: null, nullable: true })
  regionId: number;

  @Index()
  @Column({ type: 'int', comment: '0:unuse,1:used', default: 0 })
  status: number;

  @Index()
  @Column({ type: 'timestamp', nullable: true, default: null })
  allocation_date: string;

  @Column({ type: 'timestamp', nullable: true, default: null })
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
