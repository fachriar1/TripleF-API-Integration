import { Module } from '@nestjs/common';
import { AppConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './index';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'development'
          ? `.env.${process.env.NODE_ENV}`
          : `.env`,
      load: [configuration],
      validationSchema: Joi.object({
        ENV: Joi.string(),
        PORT: Joi.string(),
        VERSION: Joi.string(),
        NAME_PROGRAM: Joi.string(),
        CRYPTO_SECRET: Joi.string(),
        WA_UNOFFICIAL_API: Joi.string(),
        WA_OFFICIAL_API: Joi.string(),
        CORE_API: Joi.string(),
        WA_OFFICIAL_USER: Joi.string(),
        WA_OFFICIAL_PASS: Joi.string(),
        WA_OFFICIAL_SENDERID: Joi.string(),
        TOKEN_FIREBASE: Joi.string(),
        TOKEN_FIREBASE_WEB: Joi.string(),
        BASE_URL: Joi.string(),
        RELEASE_DATE: Joi.string(),
        BCRIPT_SECRET: Joi.string(),
        MAIL_PASS: Joi.string(),
        MAIL_USER: Joi.string(),
        AWS_BUCKET_NAME: Joi.string().allow(''),
        AWS_BUCKET_URL: Joi.string().allow(''),
        AWS_ACCESS_KEY: Joi.string().allow(''),
        AWS_SECRET_ACCESS_KEY: Joi.string().allow(''),
      }),
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
