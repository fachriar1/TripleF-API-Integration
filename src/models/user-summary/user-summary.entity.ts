import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { Users } from '../user/user.entity';

@Entity()
export class UserSummary {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.id)
  user: Users;
  @Index()
  @Column({ type: 'int', default: null, nullable: true })
  userId: number;

  @Column({ type: 'varchar', length: 255, default: '' })
  description: string;

  @Column({ type: 'int', width: 11, default: 0, nullable: true })
  active_chat: number;

  @Column({ type: 'int', width: 11, default: 0, nullable: true })
  total_chat: number;

  @Column({ type: 'int', width: 11, default: 0, nullable: true })
  resolve_chat: number;

  @Column({ type: 'int', width: 11, default: 0, nullable: true })
  avg_rating_chat: number;

  @Column({ type: 'int', width: 11, default: 0, nullable: true })
  total_rating_chat: number;

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
