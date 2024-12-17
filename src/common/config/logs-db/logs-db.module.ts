import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { LogsDbService } from './logs-db.service';
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
        URI: Joi.string().regex(
          /^(mongodb(?:\+srv)?:\/\/)?(([^:]+):([^@]+)@)?([^:/]+)(?::(\d+))?(\/[^?]+)(?:\?([^=]+=[^&]+(?:&[^=]+=[^&]+)*))?/,
        ),
      }),
    }),
  ],
  providers: [ConfigService, LogsDbService],
  exports: [ConfigService, LogsDbService],
})
export class LogsDbModule {}
