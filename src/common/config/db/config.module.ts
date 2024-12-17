import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import * as Joi from 'joi';
import { MainDbConfigService } from './config.service';
import configuration from "./index"

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV === 'development' ? `.env.${process.env.NODE_ENV}` : '.env',
      load: [configuration],
      validationSchema: Joi.object({
        HOST: Joi.string(),
        USER: Joi.string(),
        PASS: Joi.string(),
        PORT: Joi.string(),
        NAME: Joi.string(),
      }),
    })],
  providers: [ConfigService, MainDbConfigService],
  exports: [ConfigService, MainDbConfigService]
})
export class MainDbConfigModule {}
