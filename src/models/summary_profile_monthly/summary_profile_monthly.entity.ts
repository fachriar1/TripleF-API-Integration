import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { UserMobile } from '../user_mobile/user_mobile.entity';

@Entity()
export class SummaryProfileMonthly {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Index()
  @Column({ type: 'varchar', length: 100, default: null, nullable: true })
  label: string;

  @Column({ type: 'int', default: 0 })
  valid_wa: number;

  @Column({ type: 'int', default: 0 })
  valid_app: number;

  @Column({ type: 'int', default: 0 })
  valid_mcr: number;

  @Column({ type: 'int', default: 0 })
  invalid_wa: number;

  @Column({ type: 'int', default: 0 })
  invalid_app: number;

  @Column({ type: 'int', default: 0 })
  invalid_mcr: number;

  @Column({ type: 'int', default: 0 })
  pending_wa: number;

  @Column({ type: 'int', default: 0 })
  pending_app: number;

  @Column({ type: 'int', default: 0 })
  pending_mcr: number;

  @Column({ type: 'int', default: 0 })
  pending: number;

  @Column({ type: 'int', default: 0 })
  valid: number;

  @Column({ type: 'int', default: 0 })
  invalid: number;

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
