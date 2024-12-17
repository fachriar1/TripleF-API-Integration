import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Script {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, default: 'For name the script' })
  name: string;

  @Column({
    type: 'smallint',
    default: 0,
    comment: '1->login, 2->register, 3->forgot, 4->submit, 5->redeem',
  })
  type: number;

  @Column({
    type: 'varchar',
    length: 255,
    default: '',
    comment: 'For header object',
  })
  title: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  messageBody: string;

  @Column({ type: 'text' })
  footer: string;

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
