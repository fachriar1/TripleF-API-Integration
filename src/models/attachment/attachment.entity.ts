import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { Entries } from '../entries/entries.entity';
import { Users } from '../user/user.entity';
import { Media } from '../media/media.entity';

import { UserMobile } from '../user_mobile/user_mobile.entity';
@Entity()
export class Attachment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Entries, (entries) => entries.id)
  entries: Entries;
  @Index()
  @Column({ default: null, nullable: true })
  entriesId: number;

  @ManyToOne(() => Media, (media) => media.id)
  media: Media;
  @Column({ default: null, nullable: true })
  mediaId: number;

  @ManyToOne(() => Users, (users) => users.id)
  user: Users;
  @Index()
  @Column({ default: null, nullable: true })
  userId: number;

  @Column({ type: 'varchar', length: 255, default: '' })
  url: string;

  @Column({
    type: 'smallint',
    default: 0,
    comment: '0->common, 1-> additional',
  })
  type: number;

  @Column({ type: 'smallint', default: 1, comment: '0->in active, 1-> active' })
  status: number;

  @Index()
  @Column({ type: 'varchar', length: 50, default: '' })
  sender: string;

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
