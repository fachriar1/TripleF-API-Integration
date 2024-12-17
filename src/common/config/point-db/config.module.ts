import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { PointDbConfigService } from './config.service';
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
  providers: [ConfigService, PointDbConfigService],
  exports: [ConfigService, PointDbConfigService],
})
export class PointDbConfigModule {}
