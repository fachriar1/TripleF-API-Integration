import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  Index,
} from 'typeorm';
import { Attachment } from '../attachment/attachment.entity';
import { EntriesVariant } from '../entries_variant/entries_variant.entity';
import { Media } from '../media/media.entity';
import { Store } from '../store/store.entity';
import { InvalidReason } from '../invalid_reason/invalid_reason.entity';
import { Winner } from '../winner/winner.entity';
import { History } from '../history/history.entity';
import { UserMobile } from '../user_mobile/user_mobile.entity';
import { Users } from '../user/user.entity';
@Entity()
export class Entries {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Index()
  @Column({ generated: 'uuid', type: 'varchar' })
  uuid: string;

  @OneToMany(() => History, (history) => history.entries)
  history: History[];

  @OneToOne(() => Winner, (winner) => winner.entries)
  winner: Winner;

  @OneToMany(() => Attachment, (attachment) => attachment.entries)
  attachments: Attachment[];

  @OneToMany(() => EntriesVariant, (entriesVariant) => entriesVariant.entries)
  entriesVariants: EntriesVariant[];

  @ManyToOne(() => Users, (user) => user.id)
  user: Users;
  @Index()
  @Column({ default: null, nullable: true })
  userId: number;

  @ManyToOne(() => Store, (store) => store.id)
  store: Store;
  @Column({ default: null, nullable: true })
  storeId: number;

  @ManyToOne(() => Media, (media) => media.id)
  media: Media;
  @Index()
  @Column({ default: null, nullable: true })
  mediaId: number;

  @ManyToOne(() => UserMobile, (user) => user.id)
  validateBy: UserMobile;
  @Column({ default: null, nullable: true })
  validateById: number;

  @ManyToOne(() => InvalidReason, (invalidReason) => invalidReason.id)
  invalidReason: InvalidReason;
  @Column({ default: null, nullable: true })
  invalidReasonId: number;

  @ManyToOne(() => UserMobile, (users) => users.id)
  approvedBy: UserMobile;
  @Column({ default: null, nullable: true })
  approvedById: number;

  @Column({ type: 'varchar', length: 200, default: '' })
  couponId: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  coupon: string;

  @Column({ type: 'int', default: null, nullable: true })
  couponVariantId: number;

  @Index()
  @Column({ type: 'varchar', length: 50, default: '' })
  sender: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  id_number: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  id_number_admin: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  ktp_name_admin: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  name: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  tglLahir: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  hp: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  city: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  invalid_reason_admin: string;

  @ManyToOne(() => InvalidReason, (invalidReason) => invalidReason.id)
  invalidReasonAdmin: InvalidReason;
  @Index()
  @Column({ default: null, nullable: true })
  invalidReasonAdminId: number;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  purchase_no: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  approve_reason: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  purchase_no_admin: string;

  @Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
  purchase_amount: string;

  @Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
  purchase_amount_admin: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  sap_name: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  sap_hp: string;

  @Column({ type: 'text', default: '' })
  sap_address: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  sap_district: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  sap_quantity: string;

  @Column({ type: 'varchar', length: 100, default: '' })
  sap_approver: string;

  @Index()
  @Column({ type: 'smallint', default: 0 })
  is_valid: number;

  @Column({ type: 'smallint', default: null, nullable: true })
  is_valid_admin: number;

  @Column({
    type: 'smallint',
    default: 0,
    comment: '1-> approved, 2-> rejected',
  })
  is_approved: number;

  @Column({ type: 'smallint', default: 0 })
  approvedById_admin: number;

  @Column({ type: 'smallint', default: 0 })
  is_approved_admin: number;

  @Column({ type: 'int', default: 0 })
  totalCoupon: number;

  @Column({ type: 'int', default: 0 })
  totalPoint: number;

  @Column({ type: 'int', default: 0 })
  totalReminder: number;

  @Column({ type: 'smallint', default: 0 })
  is_additional: number;

  @Column({ type: 'smallint', default: 1, comment: '0->in active,1-> active' })
  status: number;

  @Column({ type: 'timestamp', nullable: true, default: null })
  purchase_date: string;

  @Column({ type: 'timestamp', nullable: true, default: null })
  purchase_date_admin: string;

  @Column({ type: 'timestamp', nullable: true, default: null })
  validation_date_store: string;

  @Column({ type: 'timestamp', nullable: true, default: null })
  validation_date_admin: string;

  @Column({ type: 'timestamp', nullable: true, default: null })
  approved_date: string;

  @Index()
  @Column({ type: 'timestamp', nullable: true, default: null })
  rcvd_time: string;

  @Column({ type: 'smallint', default: 0 })
  is_deleted: number;

  @CreateDateColumn({ type: 'timestamp', default: null, nullable: true })
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
