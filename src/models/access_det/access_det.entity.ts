import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Access } from '../access/access.entity';
import { Menu } from '../menu/menu.entity';

import { UserMobile } from '../user_mobile/user_mobile.entity';
@Entity()
export class AccessDet {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Access, (access) => access.id)
  access: Access;
  @Column({ default: null, nullable: true })
  accessId: number;

  @ManyToOne(() => Menu, (menu) => menu.id)
  menu: Menu;
  @Column({ default: null, nullable: true })
  menuId: number;

  @Column({ type: 'smallint', width: 2, default: 0 })
  m_insert: number;

  @Column({ type: 'smallint', width: 2, default: 0 })
  m_update: number;

  @Column({ type: 'smallint', width: 2, default: 0 })
  m_approve: number;

  @Column({ type: 'smallint', width: 2, default: 0 })
  m_delete: number;

  @Column({ type: 'smallint', width: 2, default: 0 })
  m_view: number;

  @Column({ type: 'smallint', width: 3, default: 0 })
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
