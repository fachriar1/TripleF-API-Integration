import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { Winner } from '../winner/winner.entity';
import { Users } from '../user/user.entity';
@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Winner, (winner) => winner.id)
  winner: Winner;
  @Index()
  @Column({ default: null, nullable: true })
  winnerId: number;

  @Column({
    type: 'smallint',
    width: 4,
    default: 0,
    comment: '0->unprocessed, 1->processed, 2->success, 3->failed',
  })
  status: number;

  @Column({ type: 'varchar', length: 100, default: '' })
  reason: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  resi: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  account_number: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  reference: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  code: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  price: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  sn: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  balance: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  tr_id: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  rc: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  pin: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  amount: string;

  @Column({ type: 'text', default: null, nullable: true })
  message: string;

  @Column({ type: 'timestamp', default: null, nullable: true })
  expired: string;

  @Column({ type: 'timestamp', default: null, nullable: true })
  proccesed_date: string;

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
