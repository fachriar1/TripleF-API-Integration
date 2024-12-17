import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Index,
  OneToMany,
} from 'typeorm';
import { History } from '../history/history.entity';
import { Users } from '../user/user.entity';
import { UserMobile } from '../user_mobile/user_mobile.entity';
import { UserRank } from '../user_rank/user-rank.entity';

@Entity()
export class UserRankPeriode {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => UserRank, (userRank) => userRank.userRankPeriode)
  userRanks: UserRankPeriode[];

  @OneToMany(() => History, (history) => history.userRankPeriode)
  historys: History[];

  @Index()
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'NULL',
    nullable: true,
  })
  periode: string;

  @Index()
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'NULL',
    nullable: true,
  })
  periode_end: string;

  @Column({ type: 'varchar', length: 100, default: '', nullable: true })
  description: string;

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

  @Column({ type: 'int', default: 0, nullable: false })
  time_online: number;

  @Column({ type: 'timestamp', default: null, nullable: true })
  last_online: string;

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
