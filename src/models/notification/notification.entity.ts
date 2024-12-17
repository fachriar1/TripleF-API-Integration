import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { Prize } from '../prize/prize.entity';
import { Users } from '../user/user.entity';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Prize, (prize) => prize.id)
  prize: Prize;
  @Index()
  @Column({ default: null, nullable: true })
  prizeId: number;

  @ManyToOne(() => Users, (users) => users.id)
  user: Users;
  @Index()
  @Column({ default: null, nullable: true })
  userId: number;

  @Column({ type: 'varchar', length: 255, default: '' })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({
    type: 'smallint',
    default: 0,
    comment: '0:undelivered,1:delivered,2:read',
  })
  status: number;

  @Column({ type: 'text' })
  data: string;

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
