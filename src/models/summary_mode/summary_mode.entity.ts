import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { UserMobile } from '../user_mobile/user_mobile.entity';
@Entity()
export class SummaryMode {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 50, default: null, nullable: true })
  summary_name: string;

  @Column({ type: 'varchar', length: 50, default: null, nullable: true })
  summary_cell_key: string;

  @Column({ type: 'varchar', length: 50, default: null, nullable: true })
  summary_key: string;

  @Column({ type: 'varchar', length: 50, default: null, nullable: true })
  graph: string;

  @Column({ type: 'varchar', length: 50, default: null, nullable: true })
  graph_name: string;

  @Column({ type: 'int', width: 11, default: null, nullable: true })
  media: number;

  @Column({ type: 'varchar', length: 50, default: null, nullable: true })
  prjType: string;

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
