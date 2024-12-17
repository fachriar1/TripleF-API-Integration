import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Entries } from '../entries/entries.entity';
import { Validation } from '../validation/validation.entity';
import { Winner } from '../winner/winner.entity';
import { UserMobile } from '../user_mobile/user_mobile.entity';
@Entity()
export class InvalidReason {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToMany(() => Entries, (entries) => entries.invalidReason)
  entries: Entries[];

  @OneToMany(() => Entries, (entries) => entries.invalid_reason_admin)
  entriesAdmin: Entries[];

  @OneToMany(() => Winner, (winner) => winner.invalidReason)
  winners: Winner[];

  @OneToMany(() => Validation, (validation) => validation.invalidReason)
  validations: Validation[];

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    default: '',
    unique: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    default: '',
    unique: true,
  })
  alias: string;

  @Column({ type: 'varchar', length: 255, default: null, nullable: true })
  template_name: string;

  @Column({ type: 'text', nullable: true })
  reply: string;

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
