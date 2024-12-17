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
export class Otp {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Users, (user) => user.id)
  user: Users;
  @Index()
  @Column({ default: null, nullable: true })
  userId: number;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: true })
  otpCode: string;

  @Index()
  @Column({ type: 'varchar', length: 20, nullable: true, default: '' })
  hp: string;

  @Index()
  @Column({ type: 'int', default: 0 })
  expired: number;

  @Column({
    type: 'smallint',
    width: 3,
    default: 0,
    comment: '0:unused,1:used',
    nullable: true,
  })
  status: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'NULL',
    nullable: true,
  })
  read_at: string;

  @Column({
    type: 'smallint',
    width: 2,
    default: 0,
    comment: '0->inactive, 1->active',
    nullable: true,
  })
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
