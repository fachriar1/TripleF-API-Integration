import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Index,
  OneToMany,
} from 'typeorm';
import { Entries } from '../entries/entries.entity';
import { HistoryDetail } from '../history_detail/history_detail.entity';
import { Users } from '../user/user.entity';
import { Winner } from '../winner/winner.entity';

import { UserMobile } from '../user_mobile/user_mobile.entity';
import { UserRankPeriode } from '../user_rank_periode/user-rank_periode.entity';
@Entity()
export class History {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToMany(() => HistoryDetail, (historyDetail) => historyDetail.history)
  historyDetail: HistoryDetail[];

  @ManyToOne(() => Users, (users) => users.id)
  user: Users;
  @Index()
  @Column({ type: 'int', nullable: true, default: null })
  userId: number;

  @ManyToOne(() => UserRankPeriode, (userRankPeriode) => userRankPeriode.id)
  userRankPeriode: UserRankPeriode;
  @Index()
  @Column({ type: 'int', nullable: true, default: null })
  userRankPeriodeId: number;

  @Column({ type: 'int', default: 0 })
  point: number;

  @ManyToOne(() => Winner, (winner) => winner.id)
  winner: Winner;
  @Index()
  @Column({ type: 'int', nullable: true, default: null })
  winnerId: number;

  @ManyToOne(() => Entries, (entries) => entries.id)
  entries: Entries;
  @Index()
  @Column({ type: 'int', nullable: true, default: null })
  entriesId: number;

  @Column({
    type: 'int',
    default: 0,
    comment:
      '1-> upload struct, 2-> ambil hadiah, 3-> tukar point,4->kupon undian,0-> other history',
  })
  @Index()
  type: number;

  @Column({ type: 'text' })
  desc: string;

  @Column({ type: 'varchar', default: '', length: 100 })
  coupon: string;

  @Column({ type: 'smallint', default: 1, comment: '1:unread,2:read' })
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

  @Index()
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
