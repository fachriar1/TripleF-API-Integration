import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Allocation } from '../allocation/allocation.entity';
import { AllocationCity } from '../allocation_city/allocation_city.entity';
import { City } from '../city/city.entity';
import { UserMobile } from '../user_mobile/user_mobile.entity';
@Entity()
export class Regions {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToMany(() => City, (city) => city.region)
  cities: City[];

  @OneToMany(() => AllocationCity, (allocationCity) => allocationCity.region)
  allocationCities: AllocationCity[];

  @OneToMany(() => Allocation, (allocation) => allocation.region)
  allocations: Allocation[];

  @Column({ type: 'varchar', length: 100 })
  name: string;

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
