import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/models/user/user.module';
import { CommonServiceModule } from '@common/services/common.module';
import { AppConfigModule } from '@common/config/api/config.module';

import { ForgotPasswordModule } from 'src/models/forgot_password/forgot_password.module';

import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigService } from '@common/config/api/config.service';
import { CommonService } from '@common/services/common.service';
import { NodemailerModule } from '../nodemailer/nodemailer.module';
import { LoginSessionModule } from 'src/models/login_session/login_session.module';
import { DistrictModule } from 'src/models/district/district.module';
import { OtpModule } from 'src/models/otp/otp.module';
import { ScriptConfigModule } from '@common/config/script/config.module';
import { EntriesModule } from 'src/models/entries/entries.module';
import { MainDbConfigModule } from '@common/config/db/config.module';
import { ScriptModule } from 'src/models/script/script.module';
import { GeneralParameterModule } from 'src/models/general_parameter/general_parameter.module';
import { NotificationModule } from 'src/models/notification/notification.module';
import { UserRankModule } from 'src/models/user_rank/user-rank.module';
import { UserRankPeriodeModule } from 'src/models/user_rank_periode/user-rank_periode.module';
@Module({
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  imports: [
    NodemailerModule,
    UsersModule,
    CommonServiceModule,
    AppConfigModule,
    ForgotPasswordModule,
    LoginSessionModule,
    ScriptConfigModule,
    EntriesModule,
    MainDbConfigModule,
    DistrictModule,
    OtpModule,
    UserRankModule,
    UserRankPeriodeModule,
    ScriptModule,
    NotificationModule,
    JwtModule.registerAsync({
      imports: [AppConfigModule, CommonServiceModule],
      inject: [AppConfigService, CommonService],
      useFactory: async (
        configService: AppConfigService,
        commonService: CommonService,
      ) => {
        const {} = await this;
        return {
          secret: configService.CRYPTO_SECRET,
        };
      },
    }),
  ],
  exports: [AuthService],
})
export class AuthModule {}
