import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { Attachment } from '../attachment/attachment.entity';
import { BlackList } from '../black_list/black_list.entity';
import { Entries } from '../entries/entries.entity';
import { History } from '../history/history.entity';
import { Media } from '../media/media.entity';
import { Occupancy } from '../occupancy/occupancy.entity';
import { Store } from '../store/store.entity';
import { UserMobile } from '../user_mobile/user_mobile.entity';
import { WhiteList } from '../white_list/white_list.entity';
import { Winner } from '../winner/winner.entity';
import { UserRank } from '../user_rank/user-rank.entity';
import { LoginSession } from '../login_session/login_session.entity';
import { Otp } from '../otp/otp.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToMany(() => UserRank, (userRank) => userRank.user)
  userRanks: UserRank[];

  @OneToMany(() => Winner, (winner) => winner.user)
  winners: Winner[];

  @OneToMany(() => Entries, (entries) => entries.user)
  entries: Entries[];

  @OneToMany(() => Attachment, (attachment) => attachment.user)
  attachments: Attachment[];

  @OneToMany(() => BlackList, (blackList) => blackList.user)
  blackLists: BlackList[];

  @OneToMany(() => History, (history) => history.user)
  histories: History[];

  @ManyToOne(() => Occupancy, (occupancy) => occupancy.id)
  occupancy: Occupancy;
  @Column({ default: null, nullable: true })
  occupancyId: number;

  @ManyToOne(() => Media, (media) => media.id)
  media: Media;
  @Column({ default: null, nullable: true })
  mediaId: number;

  @OneToOne(() => Store, (store) => store.id)
  @JoinColumn()
  store: Store;

  @OneToMany(() => LoginSession, (loginSession) => loginSession.user)
  loginSession: LoginSession[];

  @OneToMany(() => LoginSession, (item) => item.createdBy)
  loginSessionCreated: LoginSession[];

  @OneToMany(() => LoginSession, (item) => item.updatedBy)
  loginSessionUpdated: LoginSession[];

  @OneToMany(() => LoginSession, (item) => item.deletedBy)
  loginSessionDeleted: LoginSession[];

  @OneToMany(() => Otp, (item) => item.user)
  otp: Otp[];

  @OneToMany(() => Otp, (item) => item.createdBy)
  otpCreated: Otp[];

  @OneToMany(() => Otp, (item) => item.updatedBy)
  otpUpdated: Otp[];

  @OneToMany(() => Otp, (item) => item.deletedBy)
  otpDeleted: Otp[];

  @OneToOne(() => UserMobile, (item) => item.user)
  userMobile: UserMobile;

  @OneToMany(() => WhiteList, (whitelist) => whitelist.user)
  whitelists: WhiteList[];

  @Column({ type: 'varchar', length: 255, nullable: true, default: null })
  password: string;

  @Index()
  @Column({ type: 'varchar', length: 50, nullable: true, unique: true })
  email: string;

  @Index()
  @Column({ type: 'int', default: 0 })
  createdBy: number;
  userCreated: Users;

  @Index()
  @Column({ type: 'int', default: 0 })
  updatedBy: number;
  userUpdated: Users;

  @Index()
  @Column({ type: 'int', default: 0 })
  deletedBy: number;
  userdDeleted: Users;

  @Column({
    type: 'varchar',
    length: 50,
    default: null,
    unique: true,
    nullable: true,
  })
  username: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  fullname: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  accountname: string;

  @Column({ type: 'date', default: null, nullable: true })
  birthdate: string;

  @Column({ type: 'varchar', length: 10, default: '' })
  gender: string;

  @Column({ type: 'text', nullable: true, default: null })
  address: string;

  @Column({ type: 'varchar', length: 10, default: '' })
  zipcode: string;

  @Column({ type: 'varchar', length: 255, default: '' })
  picture: string;

  @Column({ type: 'int', width: 4, default: 0, nullable: true })
  age: string | number;

  @Column({ type: 'int8', default: 0, nullable: true })
  coupon: number;

  @Column({ type: 'varchar', length: 255, nullable: true, default: '' })
  province: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: '' })
  regency: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: '' })
  district: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: '' })
  province_ktp: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: '' })
  regency_ktp: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: '' })
  district_ktp: string;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: true,
    default: null,
  })
  hp: string;

  @Column({
    type: 'varchar',
    length: 50,
    default: null,
    nullable: true,
  })
  identity: string;

  @Column({ type: 'int', default: 0 })
  id_type: string;

  @Column({ type: 'varchar', length: 50, nullable: true, default: null })
  ref_code: string;

  @Column({ type: 'varchar', length: 50, nullable: true, default: 0 })
  versionIos: string;

  @Column({ type: 'varchar', length: 50, nullable: true, default: 0 })
  versionAndroid: string;

  @Column({ type: 'int', width: 11, nullable: true, default: 0 })
  refferer: number;

  @Column({ type: 'int', width: 11, nullable: true, default: 0 })
  point: number;

  @Column({ type: 'int', width: 11, nullable: true, default: 0 })
  count_winner_pulsa: number;

  @Column({ type: 'int', width: 11, nullable: true, default: 0 })
  count_winner_big: number;

  @Column({ type: 'smallint', width: 11, default: 0 })
  is_agree: number;

  @Column({ type: 'smallint', width: 11, default: 0 })
  status: number;

  @Column({
    type: 'smallint',
    width: 4,
    default: 0,
    comment: '1->konsumen, 2->toko',
  })
  type: number;

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
