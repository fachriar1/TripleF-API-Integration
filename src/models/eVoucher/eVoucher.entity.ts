import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Prize } from '../prize/prize.entity';
import { Winner } from '../winner/winner.entity';

import { UserMobile } from '../user_mobile/user_mobile.entity';
@Entity()
export class Voucher {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToMany(() => Prize, (prize) => prize.voucher)
  prizes: Prize[];

  @OneToMany(() => Winner, (winner) => winner.voucher)
  winners: Winner[];

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: 'code for topup(mobile pulsa)',
  })
  code: string;

  @Column({
    type: 'varchar',
    length: 50,
    comment: 'amount for topup',
    default: 0,
  })
  amount: string;

  @Column({
    type: 'smallint',
    width: 4,
    comment: '1->mobilepulsa,2->iris',
    default: 0,
  })
  type: number;

  @Column({
    type: 'smallint',
    width: 4,
    comment: '1->redeem,2->tukar point',
    default: 0,
  })
  category: number;

  @Column({ type: 'smallint', width: 4, comment: '0->active, 1->inactive' })
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
