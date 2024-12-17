import { AppConfigModule } from '@common/config/api/config.module';
import { CommonServiceModule } from '@common/services/common.module';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UsersModule as UsersDbModule } from 'src/models/user/user.module';
import { PeriodeModule } from 'src/models/periode/periode.module';
import { WhiteListModule } from 'src/models/white_list/white_list.module';
import { ScriptConfigModule } from '@common/config/script/config.module';
import { MainDbConfigModule } from '@common/config/db/config.module';
import { EntriesModule } from 'src/models/entries/entries.module';
import { CouponDbModule } from 'src/db/coupon-db/coupon-db.module';
import { CouponVariantModule } from 'src/models/coupon_variant/coupon_variant.module';
import { PrizeModule } from 'src/models/prize/prize.module';
import { WinnerModule } from 'src/models/winner/winner.module';
import { HistoryModule } from 'src/models/history/history.module';
import { PointDbModule } from 'src/db/point-db/point-db.module';
import { CouponModule } from 'src/models/coupon/coupon.module';
import { NotificationModule } from 'src/models/notification/notification.module';
import { ScriptModule } from 'src/models/script/script.module';
import { HistoryDetailModule } from 'src/models/history_detail/history_detail.module';
import { VoucherModule } from 'src/models/eVoucher/eVoucher.module';
import { UserRankModule } from 'src/models/user_rank/user-rank.module';
import { UserRankPeriodeModule } from 'src/models/user_rank_periode/user-rank_periode.module';
@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    UsersDbModule,
    CommonServiceModule,
    AppConfigModule,
    PeriodeModule,
    WhiteListModule,
    ScriptConfigModule,
    MainDbConfigModule,
    EntriesModule,
    CouponDbModule,
    CouponVariantModule,
    PointDbModule,
    PrizeModule,
    WinnerModule,
    HistoryModule,
    CouponModule,
    NotificationModule,
    ScriptModule,
    HistoryDetailModule,
    VoucherModule,
    UserRankModule,
    UserRankPeriodeModule,
  ],
})
export class UserModule {}
