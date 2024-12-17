import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Prize } from '../prize/prize.entity';
import { UserMobile } from '../user_mobile/user_mobile.entity';
@Entity()
export class PrizeCategory {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToMany(() => Prize, (prize) => prize.category)
  prizes: Prize[];

  @Column({ type: 'varchar', length: 255, default: '' })
  name: string;

  @Column({ type: 'smallint', default: 1, comment: '0->in active,1-> active' })
  status: number;

  @Column({
    type: 'smallint',
    default: 1,
    comment: 'limit per periode/category, 0-> unlimited',
  })
  limit: number;

  @Column({
    type: 'smallint',
    default: 1,
    comment: 'limit per periode/category, 0-> unlimited',
  })
  limitPerDay: number;

  @Column({
    type: 'smallint',
    default: 1,
    comment: 'limit per periode/category, 0-> unlimited',
  })
  limitPerMonth: number;

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