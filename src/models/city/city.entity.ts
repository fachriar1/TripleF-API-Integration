import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  Index,
} from 'typeorm';
import { Province } from '../province/province.entity';
import { Regions } from '../region/region.entity';
import { District } from '../district/district.entity';

import { UserMobile } from '../user_mobile/user_mobile.entity';
@Entity()
export class City {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToMany(() => District, (district) => district.city)
  districts: District[];

  @ManyToOne(() => Province, (province) => province.id)
  province: Province;
  @Index()
  @Column({ default: null, nullable: true })
  provinceId: number;

  @ManyToOne(() => Regions, (region) => region.id)
  region: Regions;
  @Index()
  @Column({ default: null, nullable: true })
  regionId: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Index()
  @Column({ type: 'varchar', length: 10 })
  code: string;

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
