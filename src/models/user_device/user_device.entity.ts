import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { UserMobile } from '../user_mobile/user_mobile.entity';
@Entity()
export class UserDevice {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToMany(() => UserMobile, (users) => users.userDevice)
  users: UserMobile[];

  @Column({ type: 'varchar', length: 50, default: null, nullable: true })
  imei: string;

  @Column({ type: 'varchar', length: 50, default: null, nullable: true })
  devicetype: string;

  @Column({ type: 'varchar', length: 50, default: null, nullable: true })
  language: string;

  @Column({ type: 'varchar', length: 50, default: null, nullable: true })
  manufacturer: string;

  @Column({ type: 'varchar', length: 50, default: null, nullable: true })
  model: string;

  @Column({ type: 'varchar', length: 50, default: null, nullable: true })
  os: string;

  @Column({ type: 'varchar', length: 50, default: null, nullable: true })
  osVersion: string;

  @Column({ type: 'varchar', length: 50, default: null, nullable: true })
  region: string;

  @Column({ type: 'varchar', length: 50, default: null, nullable: true })
  sdkVersion: string;

  @Column({ type: 'int', width: 11, default: null, nullable: true })
  heightdips: number;

  @Column({ type: 'int', width: 11, default: null, nullable: true })
  heightpixels: number;

  @Column({ type: 'int', width: 11, default: null, nullable: true })
  scale: number;

  @Column({ type: 'int', width: 11, default: null, nullable: true })
  widthdips: number;

  @Column({ type: 'int', width: 11, default: null, nullable: true })
  widthpixels: number;

  @Column({ type: 'varchar', length: 50, default: null, nullable: true })
  player_id: string;

  @Column({ type: 'varchar', length: 255, default: null, nullable: true })
  firebase_id: string;

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
