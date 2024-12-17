import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Reply } from '../reply/reply.entity';
import { UserMobile } from '../user_mobile/user_mobile.entity';
@Entity()
export class ResponseCode {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToMany(() => Reply, (reply) => reply.id)
  replies: Reply[];

  @Column({ type: 'smallint', default: 1, comment: '0->in active,1-> active' })
  status: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  code: string;

  @Column({ type: 'varchar', length: 100 })
  description: string;

  @Column({ type: 'varchar', length: 100 })
  responseStatus: string;

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
