import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
require('dotenv').config();

@Injectable()
export class MainDbConfigService {
  constructor(private configService: ConfigService) {}

  get HOST(): string {
    return this.configService.get<string>('main-db.HOST');
  }

  get PORT(): number {
    return +this.configService.get<string>('main-db.PORT') || 5432;
  }

  get USER(): string {
    return this.configService.get<string>('main-db.USER');
  }

  get PASS(): string {
    return this.configService.get<string>('main-db.PASS') || '';
  }

  get NAME(): string {
    return this.configService.get<string>('main-db.NAME');
  }

  typeORMConfig(): DataSourceOptions {
    return {
      type: 'postgres',
      host:
        this.configService.get<string>('main-db.HOST') || process.env.DB_HOST,
      port: Number(
        this.configService.get<string>('main-db.PORT') || process.env.DB_PORT,
      ),
      username:
        this.configService.get<string>('main-db.USER') || process.env.DB_USER,
      password:
        this.configService.get<string>('main-db.PASS') || process.env.DB_PASS,
      database:
        this.configService.get<string>('main-db.NAME') || process.env.DB_NAME,
      logging: false,
      synchronize: false, // dont change to true, use migration in server to update database
      entities: [join(__dirname, '/../../../models/**/*.entity{.ts,.js}')],
      migrations: [__dirname + '/../../../migrations/**/*{.ts,.js}'],
    };
  }

  async dbConnection() {
    const appDataSource = new DataSource(this.typeORMConfig());
    await appDataSource.initialize();
    return appDataSource;
  }
}
