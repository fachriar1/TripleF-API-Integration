import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { Media } from '../media/media.entity';
import { Users } from '../user/user.entity';

import { UserMobile } from '../user_mobile/user_mobile.entity';
@Entity()
export class LogRequest {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Media, (media) => media.id)
  media: Media;
  @Column({ default: null, nullable: true })
  mediaId: number;

  @Column({
    type: 'smallint',
    default: 1,
    comment:
      'direction = 0 (0-> unsend, 1-> send, 2-> read, unread), direction = 1 (0-> incoming, 1-> in validastion, 2-> response)',
  })
  status: number;

  @Index()
  @Column({ type: 'varchar', length: 255, default: '' })
  sender: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'text' })
  errorMessage: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  ip: string;

  @Column({ type: 'int', default: 0 })
  userId: number;
  user: Users;

  @Column({ type: 'int', default: 0, comment: '0->out, 1->in' })
  direction: number;

  @Column({ type: 'int', default: 0, comment: '0->no error, 1->error' })
  isError: number;

  @CreateDateColumn({ type: 'timestamp' })
  rcvd_time: string;

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
