import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Attachment } from '../attachment/attachment.entity';
import { Entries } from '../entries/entries.entity';
import { LoginSession } from '../login_session/login_session.entity';
import { LogRequest } from '../log_request/log_request.entity';
import { Menu } from '../menu/menu.entity';
import { Reply } from '../reply/reply.entity';
import { Users } from '../user/user.entity';
import { Validation } from '../validation/validation.entity';

import { UserMobile } from '../user_mobile/user_mobile.entity';
@Entity()
export class ReplyType {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToMany(() => Entries, (entries) => entries.media)
  entries: Entries[];

  @OneToMany(() => Validation, (validation) => validation.media)
  validations: Validation[];

  @OneToMany(() => Reply, (reply) => reply.replyType)
  replies: Reply[];

  @OneToMany(() => Menu, (menu) => menu.media)
  menus: Menu[];

  @OneToMany(() => Attachment, (attach) => attach.media)
  attachments: Attachment[];

  @OneToMany(() => LoginSession, (loginSession) => loginSession.media)
  loginSessions: LoginSession[];

  @OneToMany(() => LogRequest, (logRequest) => logRequest.media)
  logRequests: LogRequest[];

  @OneToMany(() => Users, (user) => user.media)
  users: Users[];

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', default: 0 })
  type: number;

  @Column({ type: 'smallint', default: 0 })
  is_json: number;

  @Column({ type: 'smallint', width: 4 })
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
