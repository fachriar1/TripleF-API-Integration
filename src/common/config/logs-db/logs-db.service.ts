import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { DataSourceOptions } from 'typeorm';

@Injectable()
export class LogsDbService {
  constructor(private configService: ConfigService) {}

  get URI(): string {
    return (
      this.configService.get<string>('logs-db.URI') || process.env.DB_LOGS_URI
    );
  }

  typeORMConfig(): DataSourceOptions {
    return {
      name: 'logs_connection',
      type: 'mongodb',
      url: this.URI,
      logging: false,
      synchronize: false, // dont change to true, use migration in server to update database
      entities: [
        join(__dirname, '/../../../logs-db/**/*.entity{.ts,.js}'),
      ],
      migrations: [
        __dirname + '/../../../migrations/**/*{.ts,.js}',
      ],
    };
  }
}
