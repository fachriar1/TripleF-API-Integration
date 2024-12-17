import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

@Injectable()
export class CouponDbConfigService {
  constructor(private configService: ConfigService) {}

  get HOST(): string {
    return this.configService.get<string>('couponDB.HOST');
  }

  get USER(): string {
    return this.configService.get<string>('couponDB.USER');
  }

  get PASS(): string {
    return this.configService.get<string>('couponDB.PASS');
  }

  get NAME(): string {
    return this.configService.get<string>('couponDB.NAME');
  }

  get typeORMConfig(): string {
    return this.configService.get<string>('couponDB.URI');
  }
}
