import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

@Injectable()
export class PointDbConfigService {
  constructor(private configService: ConfigService) {}

  get HOST(): string {
    return this.configService.get<string>('pointDB.HOST');
  }

  get USER(): string {
    return this.configService.get<string>('pointDB.USER');
  }

  get PASS(): string {
    return this.configService.get<string>('pointDB.PASS');
  }

  get NAME(): string {
    return this.configService.get<string>('pointDB.NAME');
  }

  get typeORMConfig(): string {
    return this.configService.get<string>('pointDB.URI');
  }
}
