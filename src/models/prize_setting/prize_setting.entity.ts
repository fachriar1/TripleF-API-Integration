import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Prize } from '../prize/prize.entity';
import { UserMobile } from '../user_mobile/user_mobile.entity';
@Entity()
export class PrizeSetting {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => Prize, (prize) => prize.id)
  @JoinColumn()
  prize: Prize;

  @Column({ type: 'time', default: '00:00:00', nullable: true })
  startTime: string;

  @Column({ type: 'time', default: '00:00:00', nullable: true })
  endTime: string;

  @Column({ type: 'int', default: 0 })
  interval: number;

  @Column({ type: 'int', default: 0 })
  limit: number;

  @Column({ type: 'int', default: 0 })
  minAge: number;

  @Column({ type: 'int', default: 0 })
  maxAge: number;

  @Column({ type: 'int', default: 0 })
  minSubmit: number;

  @Column({ type: 'int', default: 0 })
  maxSubmit: number;

  @Column({ type: 'int', default: 0 })
  sort: number;

  @Column({ type: 'smallint', default: 1, comment: '0->in active,1-> active' })
  status: number;

  @Column({ type: 'int', default: 0 })
  limitPerMonth: number;

  @Column({ type: 'int', default: 0 })
  limitPerDay: number;

  @Column({ type: 'int', default: 0 })
  limitPerPeriode: number;

  @Column({ type: 'int', default: 0 })
  limitPerMonthAfterLimit: number;

  @Column({ type: 'int', default: 0 })
  limitPerDayAfterLimit: number;

  @Column({ type: 'int', default: 0 })
  limitPerPeriodeAfterLimit: number;

  @Column({ type: 'int', default: 0 })
  purchase_min: number;

  @Column({ type: 'int', default: 0 })
  purchase_max: number;

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
