import { Users } from '../user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Access } from '../access/access.entity';
import { UserDevice } from '../user_device/user_device.entity';
import { LoginSession } from '../login_session/login_session.entity';
import { Notification } from '../notification/notification.entity';
import { Otp } from '../otp/otp.entity';
import { UserSummary } from '../user-summary/user-summary.entity';
import { AccessDet } from '../access_det/access_det.entity';
import { AllocationCategory } from '../allocation_category/allocation_category.entity';
import { Allocation } from '../allocation/allocation.entity';
import { Attachment } from '../attachment/attachment.entity';
import { Banner } from '../banner/banner.entity';
import { BlackList } from '../black_list/black_list.entity';
import { Coupon } from '../coupon/coupon.entity';
import { City } from '../city/city.entity';
import { HistoryDetail } from '../history_detail/history_detail.entity';
import { District } from '../district/district.entity';
import { EntriesVariant } from '../entries_variant/entries_variant.entity';
import { Entries } from '../entries/entries.entity';
import { Voucher } from '../eVoucher/eVoucher.entity';
import { Faq } from '../faq/faq.entity';
import { ForgotPassword } from '../forgot_password/forgot_password.entity';
import { GeneralParameter } from '../general_parameter/general_parameter.entity';
import { History } from '../history/history.entity';
import { Introduction } from '../introduction/introduction.entity';
import { InvalidReason } from '../invalid_reason/invalid_reason.entity';
import { LogRequest } from '../log_request/log_request.entity';
import { Media } from '../media/media.entity';
import { Menu } from '../menu/menu.entity';
import { News } from '../news/news.entity';
import { Occupancy } from '../occupancy/occupancy.entity';
import { Periode } from '../periode/periode.entity';
import { PrefixPulsa } from '../prefix_pulsa/prefix_pulsa.entity';
import { PrizeCategory } from '../prize_category/prize_category.entity';
import { PrizeSetting } from '../prize_setting/prize_setting.entity';
import { PrizeType } from '../prize_type/prize_type.entity';
import { Prize } from '../prize/prize.entity';
import { ProductCategory } from '../product_category/product_category.entity';
import { Product } from '../product/product.entity';
import { Province } from '../province/province.entity';
import { Regions } from '../region/region.entity';
import { Reply } from '../reply/reply.entity';
import { ResponseCode } from '../response_code/response_code.entity';
import { Sales } from '../sales/sales.entity';
import { Store } from '../store/store.entity';
import { StoreArea } from '../store_area/store_area.entity';
import { Tnc } from '../tnc/tnc.entity';
import { Transaction } from '../transaction/transaction.entity';
import { Validation } from '../validation/validation.entity';
import { Version } from '../version/version.entity';
import { Video } from '../video/video.entity';
import { WhiteList } from '../white_list/white_list.entity';
import { Winner } from '../winner/winner.entity';
import { Zipcode } from '../zipcode/zipcode.entity';
import { AllocationCity } from '../allocation_city/allocation_city.entity';
import { UserRank } from '../user_rank/user-rank.entity';
import { UserRankPeriode } from '../user_rank_periode/user-rank_periode.entity';

@Entity()
export class UserMobile {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToMany(() => AccessDet, (item) => item.createdBy)
  accessDetCreated: AccessDet[];

  @OneToMany(() => AccessDet, (item) => item.updatedBy)
  accessDetUpdated: AccessDet[];

  @OneToMany(() => AccessDet, (item) => item.deletedBy)
  accessDetDeleted: AccessDet[];

  @OneToMany(() => Access, (item) => item.createdBy)
  accessCreated: Access[];

  @OneToMany(() => Access, (item) => item.updatedBy)
  accessUpdated: Access[];

  @OneToMany(() => Access, (item) => item.deletedBy)
  accessDeleted: Access[];

  @OneToMany(() => AllocationCategory, (item) => item.createdBy)
  allocationCategoryCreated: AllocationCategory[];

  @OneToMany(() => AllocationCategory, (item) => item.updatedBy)
  allocationCategoryUpdated: AllocationCategory[];

  @OneToMany(() => AllocationCategory, (item) => item.deletedBy)
  allocationCategoryDeleted: AllocationCategory[];

  @OneToMany(() => Allocation, (item) => item.createdBy)
  allocationCreated: Allocation[];

  @OneToMany(() => Allocation, (item) => item.updatedBy)
  allocationUpdated: Allocation[];

  @OneToMany(() => Allocation, (item) => item.deletedBy)
  allocationDeleted: Allocation[];

  @OneToMany(() => Attachment, (item) => item.createdBy)
  attachmentCreated: Attachment[];

  @OneToMany(() => Attachment, (item) => item.updatedBy)
  attachmentUpdated: Attachment[];

  @OneToMany(() => Attachment, (item) => item.deletedBy)
  attachmentDeleted: Attachment[];

  @OneToMany(() => Banner, (item) => item.createdBy)
  bannerCreated: Banner[];

  @OneToMany(() => Banner, (item) => item.updatedBy)
  bannerUpdated: Banner[];

  @OneToMany(() => Banner, (item) => item.deletedBy)
  bannerDeleted: Banner[];

  @OneToMany(() => BlackList, (item) => item.createdBy)
  blackListCreated: BlackList[];

  @OneToMany(() => BlackList, (item) => item.updatedBy)
  blackListUpdated: BlackList[];

  @OneToMany(() => BlackList, (item) => item.deletedBy)
  blackListDeleted: BlackList[];

  @OneToMany(() => City, (item) => item.createdBy)
  cityCreated: City[];

  @OneToMany(() => City, (item) => item.updatedBy)
  cityUpdated: City[];

  @OneToMany(() => City, (item) => item.deletedBy)
  cityDeleted: City[];

  @OneToMany(() => Coupon, (item) => item.createdBy)
  couponCreated: Coupon[];

  @OneToMany(() => Coupon, (item) => item.updatedBy)
  couponUpdated: Coupon[];

  @OneToMany(() => Coupon, (item) => item.deletedBy)
  couponDeleted: Coupon[];

  @OneToMany(() => HistoryDetail, (item) => item.createdBy)
  historyDetailCreated: HistoryDetail[];

  @OneToMany(() => HistoryDetail, (item) => item.updatedBy)
  historyDetailUpdated: HistoryDetail[];

  @OneToMany(() => HistoryDetail, (item) => item.deletedBy)
  historyDetailDeleted: HistoryDetail[];

  @OneToMany(() => District, (item) => item.createdBy)
  districtCreated: District[];

  @OneToMany(() => District, (item) => item.updatedBy)
  districtUpdated: District[];

  @OneToMany(() => District, (item) => item.deletedBy)
  districtDeleted: District[];

  @OneToMany(() => EntriesVariant, (item) => item.createdBy)
  entriesVariantCreated: EntriesVariant[];

  @OneToMany(() => EntriesVariant, (item) => item.updatedBy)
  entriesVariantUpdated: EntriesVariant[];

  @OneToMany(() => EntriesVariant, (item) => item.deletedBy)
  entriesVariantDeleted: EntriesVariant[];

  @OneToMany(() => Entries, (item) => item.approvedBy)
  entriesApproved: Entries[];

  @OneToMany(() => Entries, (item) => item.validateBy)
  entriesValidateBy: Entries[];

  @OneToMany(() => Entries, (item) => item.createdBy)
  entriesCreated: Entries[];

  @OneToMany(() => Entries, (item) => item.updatedBy)
  entriesUpdated: Entries[];

  @OneToMany(() => Entries, (item) => item.deletedBy)
  entriesDeleted: Entries[];

  @OneToMany(() => Voucher, (item) => item.createdBy)
  voucherCreated: Voucher[];

  @OneToMany(() => Voucher, (item) => item.updatedBy)
  voucherUpdated: Voucher[];

  @OneToMany(() => Voucher, (item) => item.deletedBy)
  voucherDeleted: Voucher[];

  @OneToMany(() => Faq, (item) => item.createdBy)
  faqCreated: Faq[];

  @OneToMany(() => Faq, (item) => item.updatedBy)
  faqUpdated: Faq[];

  @OneToMany(() => Faq, (item) => item.deletedBy)
  faqDeleted: Faq[];

  @OneToMany(() => ForgotPassword, (item) => item.createdBy)
  forgotPasswordCreated: ForgotPassword[];

  @OneToMany(() => ForgotPassword, (item) => item.updatedBy)
  forgotPasswordUpdated: ForgotPassword[];

  @OneToMany(() => ForgotPassword, (item) => item.deletedBy)
  forgotPasswordDeleted: ForgotPassword[];

  @OneToMany(() => GeneralParameter, (item) => item.createdBy)
  generalParameterCreated: GeneralParameter[];

  @OneToMany(() => GeneralParameter, (item) => item.updatedBy)
  generalParameterUpdated: GeneralParameter[];

  @OneToMany(() => GeneralParameter, (item) => item.deletedBy)
  generalParameterDeleted: GeneralParameter[];

  @OneToMany(() => History, (item) => item.createdBy)
  historyCreated: History[];

  @OneToMany(() => History, (item) => item.updatedBy)
  historyUpdated: History[];

  @OneToMany(() => History, (item) => item.deletedBy)
  historyDeleted: History[];

  @OneToMany(() => Introduction, (item) => item.createdBy)
  introductionCreated: Introduction[];

  @OneToMany(() => Introduction, (item) => item.updatedBy)
  introductionUpdated: Introduction[];

  @OneToMany(() => Introduction, (item) => item.deletedBy)
  introductionDeleted: Introduction[];

  @OneToMany(() => InvalidReason, (item) => item.createdBy)
  invalidReasonCreated: InvalidReason[];

  @OneToMany(() => InvalidReason, (item) => item.updatedBy)
  invalidReasonUpdated: InvalidReason[];

  @OneToMany(() => InvalidReason, (item) => item.deletedBy)
  invalidReasonDeleted: InvalidReason[];

  @OneToMany(() => LogRequest, (item) => item.createdBy)
  logRequestCreated: LogRequest[];

  @OneToMany(() => LogRequest, (item) => item.updatedBy)
  logRequestUpdated: LogRequest[];

  @OneToMany(() => LogRequest, (item) => item.deletedBy)
  logRequestDeleted: LogRequest[];

  @OneToMany(() => LoginSession, (item) => item.createdBy)
  loginSessionCreated: LoginSession[];

  @OneToMany(() => LoginSession, (item) => item.updatedBy)
  loginSessionUpdated: LoginSession[];

  @OneToMany(() => LoginSession, (item) => item.deletedBy)
  loginSessionDeleted: LoginSession[];

  @OneToMany(() => Media, (item) => item.createdBy)
  mediaCreated: Media[];

  @OneToMany(() => Media, (item) => item.updatedBy)
  mediaUpdated: Media[];

  @OneToMany(() => Media, (item) => item.deletedBy)
  mediaDeleted: Media[];

  @OneToMany(() => Menu, (item) => item.createdBy)
  menuCreated: Menu[];

  @OneToMany(() => Menu, (item) => item.updatedBy)
  menuUpdated: Menu[];

  @OneToMany(() => Menu, (item) => item.deletedBy)
  menuDeleted: Menu[];

  @OneToMany(() => News, (item) => item.createdBy)
  newsCreated: News[];

  @OneToMany(() => News, (item) => item.updatedBy)
  newsUpdated: News[];

  @OneToMany(() => News, (item) => item.deletedBy)
  newsDeleted: News[];

  @OneToMany(() => Notification, (item) => item.createdBy)
  notificationCreated: Notification[];

  @OneToMany(() => Notification, (item) => item.updatedBy)
  notificationUpdated: Notification[];

  @OneToMany(() => Notification, (item) => item.deletedBy)
  notificationDeleted: Notification[];

  @OneToMany(() => Occupancy, (item) => item.createdBy)
  occupancyCreated: Occupancy[];

  @OneToMany(() => Occupancy, (item) => item.updatedBy)
  occupancyUpdated: Occupancy[];

  @OneToMany(() => Occupancy, (item) => item.deletedBy)
  occupancyDeleted: Occupancy[];

  @OneToMany(() => Periode, (item) => item.createdBy)
  periodeCreated: Periode[];

  @OneToMany(() => Periode, (item) => item.updatedBy)
  periodeUpdated: Periode[];

  @OneToMany(() => Periode, (item) => item.deletedBy)
  periodeDeleted: Periode[];

  @OneToMany(() => PrefixPulsa, (item) => item.createdBy)
  prefixPulsaCreated: PrefixPulsa[];

  @OneToMany(() => PrefixPulsa, (item) => item.updatedBy)
  prefixPulsaUpdated: PrefixPulsa[];

  @OneToMany(() => PrefixPulsa, (item) => item.deletedBy)
  prefixPulsaDeleted: PrefixPulsa[];

  @OneToMany(() => PrizeCategory, (item) => item.createdBy)
  prizeCategoryCreated: PrizeCategory[];

  @OneToMany(() => PrizeCategory, (item) => item.updatedBy)
  prizeCategoryUpdated: PrizeCategory[];

  @OneToMany(() => PrizeCategory, (item) => item.deletedBy)
  prizeCategoryDeleted: PrizeCategory[];

  @OneToMany(() => PrizeSetting, (item) => item.createdBy)
  prizeSettingCreated: PrizeSetting[];

  @OneToMany(() => PrizeSetting, (item) => item.updatedBy)
  prizeSettingUpdated: PrizeSetting[];

  @OneToMany(() => PrizeSetting, (item) => item.deletedBy)
  prizeSettingDeleted: PrizeSetting[];

  @OneToMany(() => PrizeType, (item) => item.createdBy)
  prizeTypeCreated: PrizeType[];

  @OneToMany(() => PrizeType, (item) => item.updatedBy)
  prizeTypeUpdated: PrizeType[];

  @OneToMany(() => PrizeType, (item) => item.deletedBy)
  prizeTypeDeleted: PrizeType[];

  @OneToMany(() => Prize, (item) => item.createdBy)
  prizeCreated: Prize[];

  @OneToMany(() => Prize, (item) => item.updatedBy)
  prizeUpdated: Prize[];

  @OneToMany(() => Prize, (item) => item.deletedBy)
  prizeDeleted: Prize[];

  @OneToMany(() => ProductCategory, (item) => item.createdBy)
  productCategoryCreated: ProductCategory[];

  @OneToMany(() => ProductCategory, (item) => item.updatedBy)
  productCategoryUpdated: ProductCategory[];

  @OneToMany(() => ProductCategory, (item) => item.deletedBy)
  productCategoryDeleted: ProductCategory[];

  @OneToMany(() => Product, (item) => item.createdBy)
  productCreated: Product[];

  @OneToMany(() => Product, (item) => item.updatedBy)
  productUpdated: Product[];

  @OneToMany(() => Product, (item) => item.deletedBy)
  productDeleted: Product[];

  @OneToMany(() => Province, (item) => item.createdBy)
  provinceCreated: Province[];

  @OneToMany(() => Province, (item) => item.updatedBy)
  provinceUpdated: Province[];

  @OneToMany(() => Province, (item) => item.deletedBy)
  provinceDeleted: Province[];

  @OneToMany(() => Regions, (item) => item.createdBy)
  regionsCreated: Regions[];

  @OneToMany(() => Regions, (item) => item.updatedBy)
  regionsUpdated: Regions[];

  @OneToMany(() => Regions, (item) => item.deletedBy)
  regionsDeleted: Regions[];

  @OneToMany(() => Reply, (item) => item.createdBy)
  replyCreated: Reply[];

  @OneToMany(() => Reply, (item) => item.updatedBy)
  replyUpdated: Reply[];

  @OneToMany(() => Reply, (item) => item.deletedBy)
  replyDeleted: Reply[];

  @OneToMany(() => ResponseCode, (item) => item.createdBy)
  responseCodeCreated: ResponseCode[];

  @OneToMany(() => ResponseCode, (item) => item.updatedBy)
  responseCodeUpdated: ResponseCode[];

  @OneToMany(() => ResponseCode, (item) => item.deletedBy)
  responseCodeDeleted: ResponseCode[];

  @OneToMany(() => Sales, (item) => item.createdBy)
  salesCreated: Sales[];

  @OneToMany(() => Sales, (item) => item.updatedBy)
  salesUpdated: Sales[];

  @OneToMany(() => Sales, (item) => item.deletedBy)
  salesDeleted: Sales[];

  @OneToMany(() => Store, (item) => item.createdBy)
  storeCreated: Store[];

  @OneToMany(() => Store, (item) => item.updatedBy)
  storeUpdated: Store[];

  @OneToMany(() => Store, (item) => item.deletedBy)
  storeDeleted: Store[];

  @OneToMany(() => StoreArea, (item) => item.createdBy)
  storeAreaCreated: StoreArea[];

  @OneToMany(() => StoreArea, (item) => item.updatedBy)
  storeAreaUpdated: StoreArea[];

  @OneToMany(() => StoreArea, (item) => item.deletedBy)
  storeAreaDeleted: StoreArea[];

  @OneToMany(() => Tnc, (item) => item.createdBy)
  tncCreated: Tnc[];

  @OneToMany(() => Tnc, (item) => item.updatedBy)
  tncUpdated: Tnc[];

  @OneToMany(() => Tnc, (item) => item.deletedBy)
  tncDeleted: Tnc[];

  @OneToMany(() => Transaction, (item) => item.createdBy)
  transactionCreated: Transaction[];

  @OneToMany(() => Transaction, (item) => item.updatedBy)
  transactionUpdated: Transaction[];

  @OneToMany(() => Transaction, (item) => item.deletedBy)
  transactionDeleted: Transaction[];

  @OneToMany(() => UserDevice, (item) => item.createdBy)
  userDeviceCreated: UserDevice[];

  @OneToMany(() => UserDevice, (item) => item.updatedBy)
  userDeviceUpdated: UserDevice[];

  @OneToMany(() => UserDevice, (item) => item.deletedBy)
  userDeviceDeleted: UserDevice[];

  @OneToMany(() => Validation, (item) => item.createdBy)
  validationCreated: Validation[];

  @OneToMany(() => Validation, (item) => item.updatedBy)
  validationUpdated: Validation[];

  @OneToMany(() => Validation, (item) => item.deletedBy)
  validationDeleted: Validation[];

  @OneToMany(() => Version, (item) => item.createdBy)
  versionCreated: Version[];

  @OneToMany(() => Version, (item) => item.updatedBy)
  versionUpdated: Version[];

  @OneToMany(() => Version, (item) => item.deletedBy)
  versionDeleted: Version[];

  @OneToMany(() => Video, (item) => item.createdBy)
  videoCreated: Video[];

  @OneToMany(() => Video, (item) => item.updatedBy)
  videoUpdated: Video[];

  @OneToMany(() => Video, (item) => item.deletedBy)
  videoDeleted: Video[];

  @OneToMany(() => WhiteList, (item) => item.createdBy)
  whiteListCreated: WhiteList[];

  @OneToMany(() => WhiteList, (item) => item.updatedBy)
  whiteListUpdated: WhiteList[];

  @OneToMany(() => WhiteList, (item) => item.deletedBy)
  whiteListDeleted: WhiteList[];

  @OneToMany(() => Winner, (item) => item.createdBy)
  winnerCreated: Winner[];

  @OneToMany(() => Winner, (item) => item.updatedBy)
  winnerUpdated: Winner[];

  @OneToMany(() => Winner, (item) => item.deletedBy)
  winnerDeleted: Winner[];

  @OneToMany(() => UserRank, (item) => item.createdBy)
  userRankCreated: UserRank[];

  @OneToMany(() => UserRank, (item) => item.updatedBy)
  userRankUpdated: UserRank[];

  @OneToMany(() => UserRank, (item) => item.deletedBy)
  userRankDeleted: UserRank[];

  @OneToMany(() => UserRankPeriode, (item) => item.createdBy)
  userRankPeriodeCreated: UserRankPeriode[];

  @OneToMany(() => UserRankPeriode, (item) => item.updatedBy)
  userRankPeriodeUpdated: UserRankPeriode[];

  @OneToMany(() => UserRankPeriode, (item) => item.deletedBy)
  userRankPeriodeDeleted: UserRankPeriode[];

  @OneToMany(() => Zipcode, (item) => item.createdBy)
  zipcodeCreated: Zipcode[];

  @OneToMany(() => Zipcode, (item) => item.updatedBy)
  zipcodeUpdated: Zipcode[];

  @OneToMany(() => Zipcode, (item) => item.deletedBy)
  zipcodeDeleted: Zipcode[];

  @OneToMany(() => UserMobile, (item) => item.createdBy)
  userMobileCreated: UserMobile[];

  @OneToMany(() => UserMobile, (item) => item.updatedBy)
  userMobileUpdated: UserMobile[];

  @OneToMany(() => UserMobile, (item) => item.deletedBy)
  userMobileDeleted: UserMobile[];

  @OneToMany(() => AllocationCity, (item) => item.createdBy)
  allocationCityCreated: AllocationCity[];

  @OneToMany(() => AllocationCity, (item) => item.updatedBy)
  allocationCityUpdated: AllocationCity[];

  @OneToMany(() => AllocationCity, (item) => item.deletedBy)
  allocationCityDeleted: AllocationCity[];

  @OneToOne(() => Users, (user) => user.id)
  @JoinColumn()
  user: Users;
  @Index()
  @Column({ type: 'int', default: null, nullable: true })
  userId: number;

  @OneToMany(() => UserSummary, (userSummary) => userSummary.user)
  userSummary: UserSummary[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];

  @ManyToOne(() => Access, (access) => access.id)
  access: Access;
  @Column({ default: null, nullable: true })
  accessId: number;

  @ManyToOne(() => UserDevice, (userDevice) => userDevice.id)
  userDevice: UserDevice;
  @Column({ default: null, nullable: true })
  userDeviceId: number;

  @OneToMany(() => Otp, (Otp) => Otp.user)
  otps: Otp[];

  @OneToMany(() => LoginSession, (loginSession) => loginSession.user)
  loginSessions: LoginSession[];

  @Column({ type: 'smallint', default: 1, comment: '0->in active,1-> active' })
  status: number;

  @Column({ type: 'varchar', length: 255, default: '' })
  picture: string;

  @Column({ type: 'varchar', default: null, nullable: true, length: 255 })
  password: string;

  @Index()
  @Column({ type: 'varchar', default: null, nullable: true, length: 255 })
  username: string;

  @Column({ type: 'varchar', default: null, nullable: true, length: 255 })
  fullname: string;

  @Column({ type: 'varchar', default: null, nullable: true, length: 50 })
  version_android: string;

  @Column({ type: 'varchar', default: null, nullable: true, length: 50 })
  version_ios: string;

  @Column({ type: 'smallint', default: 0 })
  is_deleted: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'NULL',
    nullable: true,
  })
  deleted_at: string;

  @Column({ type: 'boolean', default: false })
  isOnline: boolean;

  @Column({ type: 'int', default: 0 })
  chatHold: number;

  @Column({ type: 'varchar', default: null, nullable: true, length: 255 })
  socket_id: string;

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

  @OneToMany(() => Otp, (item) => item.createdBy)
  otpCreated: Otp[];

  @OneToMany(() => Otp, (item) => item.updatedBy)
  otpUpdated: Otp[];

  @OneToMany(() => Otp, (item) => item.deletedBy)
  otpDeleted: Otp[];

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
