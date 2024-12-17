import { AppConfigModule } from '@common/config/api/config.module';
import { CommonServiceModule } from '@common/services/common.module';
import { Module } from '@nestjs/common';
import { MasterController } from './master.controller';
import { MasterService } from './master.service';
import { UsersModule as UsersDbModule } from 'src/models/user/user.module';
import { ScriptConfigModule } from '@common/config/script/config.module';
import { MainDbConfigModule } from '@common/config/db/config.module';
import { CouponDbModule } from 'src/db/coupon-db/coupon-db.module';
import { FaqModule } from 'src/models/faq/faq.module';
import { TncModule } from 'src/models/tnc/tnc.module';
import { NewsModule } from 'src/models/news/news.module';
import { PointDbModule } from 'src/db/point-db/point-db.module';
import { HistoryModule } from 'src/models/history/history.module';
import { NotificationModule } from 'src/models/notification/notification.module';
import { PrizeModule } from 'src/models/prize/prize.module';
import { UserRankPeriodeModule } from 'src/models/user_rank_periode/user-rank_periode.module';
import { UserRankModule } from 'src/models/user_rank/user-rank.module';
import { CacheModule } from '../cache/cache.module';
import { TopicModule } from 'src/models/topic/topic.module';
@Module({
  controllers: [MasterController],
  providers: [MasterService],
  imports: [
    UsersDbModule,
    CommonServiceModule,
    AppConfigModule,
    ScriptConfigModule,
    MainDbConfigModule,
    CouponDbModule,
    FaqModule,
    TncModule,
    NewsModule,
    PointDbModule,
    HistoryModule,
    NotificationModule,
    PrizeModule,
    UserRankPeriodeModule,
    UserRankModule,
    TopicModule,
    CacheModule,
  ],
})
export class MasterModule {}
