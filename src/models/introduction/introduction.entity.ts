import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { UserMobile } from '../user_mobile/user_mobile.entity';
@Entity()
export class Introduction {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', default: '', length: 255 })
  picture: string;

  @Column({ type: 'text' })
  desc: string;

  @Column({ type: 'varchar', default: '', length: 255 })
  title: string;

  @Column({
    type: 'smallint',
    width: 4,
    default: 0,
    comment: '0-> inactive, 1-> active',
  })
  status: number;

  @Column({ type: 'smallint', width: 4, default: 0 })
  sort: number;

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
