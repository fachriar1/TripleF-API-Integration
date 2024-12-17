import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Media } from '../media/media.entity';
import { Users } from '../user/user.entity';

@Entity()
export class LoginSession {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.id)
  user: Users;
  @Column({ default: null, nullable: true })
  userId: number;

  @ManyToOne(() => Media, (media) => media.id)
  media: Media;
  @Column({ default: null, nullable: true })
  mediaId: number;

  @Column({ generated: 'uuid', generatedType: 'STORED' })
  sessionId: string;

  @Column({ type: 'varchar', length: 100 })
  expired: string;

  @Column({
    type: 'smallint',
    width: 3,
    default: 0,
    comment: '0->inactive, 1->active',
    nullable: true,
  })
  status: number;

  @Column({
    type: 'smallint',
    width: 2,
    default: 0,
    comment: '0->active, 1->inactive',
    nullable: true,
  })
  is_deleted: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'NULL',
    nullable: true,
  })
  deleted_at: string;

  @ManyToOne(() => Users, (Users) => Users.id)
  createdBy: Users;
  @Column({ default: null, nullable: true })
  createdById: number;

  @ManyToOne(() => Users, (Users) => Users.id)
  updatedBy: Users;
  @Column({ default: null, nullable: true })
  updatedById: number;

  @ManyToOne(() => Users, (Users) => Users.id)
  deletedBy: Users;
  @Column({ default: null, nullable: true })
  deletedById: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: string;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: string;
}
