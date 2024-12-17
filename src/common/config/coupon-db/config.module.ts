import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { CouponDbConfigService } from './config.service';
import configuration from './index';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'development'
          ? `.env.${process.env.NODE_ENV}`
          : '.env',
      load: [configuration],
      validationSchema: Joi.object({
        HOST: Joi.string(),
        USER: Joi.string(),
        PASS: Joi.string(),
        NAME: Joi.string(),
        URI: Joi.string(),
      }),
    }),
  ],
  providers: [ConfigService, CouponDbConfigService],
  exports: [ConfigService, CouponDbConfigService],
})
export class CouponDbConfigModule {}
