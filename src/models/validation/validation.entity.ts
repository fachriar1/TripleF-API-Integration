import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { InvalidReason } from '../invalid_reason/invalid_reason.entity';
import { Media } from '../media/media.entity';
import { Reply } from '../reply/reply.entity';
import { UserMobile } from '../user_mobile/user_mobile.entity';
@Entity()
export class Validation {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => InvalidReason, (invalidReason) => invalidReason.id)
  invalidReason: InvalidReason;
  @Column({ default: null, nullable: true })
  invalidReasonId: number;

  @ManyToOne(() => Reply, (reply) => reply.id)
  replyValid: Reply;
  @Column({ default: null, nullable: true })
  replyValidId: number;

  @ManyToOne(() => Reply, (reply) => reply.id)
  replyInvalid: Reply;
  @Column({ default: null, nullable: true })
  replyInvalidId: number;

  @ManyToOne(() => Media, (media) => media.id)
  media: Media;
  @Column({ default: null, nullable: true })
  mediaId: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  functionName: string;

  @Column({ type: 'smallint', default: 0 })
  sort: number;

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
