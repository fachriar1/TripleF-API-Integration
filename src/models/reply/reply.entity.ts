import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Media } from '../media/media.entity';
import { ResponseCode } from '../response_code/response_code.entity';
import { Validation } from '../validation/validation.entity';

import { UserMobile } from '../user_mobile/user_mobile.entity';
import { ReplyType } from '../reply_type/reply.entity';
@Entity()
export class Reply {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToMany(() => Validation, (validation) => validation.replyInvalid)
  validationsInvalid: Validation[];

  @OneToMany(() => Validation, (validation) => validation.replyValid)
  validationsValid: Validation[];

  @ManyToOne(() => Media, (media) => media.id)
  media: Media;
  @Column({ default: null, nullable: true })
  mediaId: number;

  @ManyToOne(() => ResponseCode, (responseCode) => responseCode.id)
  responseCode: ResponseCode;
  @Column({ default: null, nullable: true })
  responseCodeId: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ManyToOne(() => ReplyType, (replyType) => replyType.id)
  replyType: ReplyType;
  @Column({ default: null, nullable: true })
  replyTypeId: number;

  @Column({ type: 'varchar', length: 255, default: '' })
  icon_popup: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  title_popup: string;

  @Column({ type: 'text', default: '' })
  reply_message: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  template_name: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  namespace: string;

  @Column({ type: 'boolean', default: false })
  wa_push: boolean;

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
