import { AppConfigModule } from '@common/config/api/config.module';
import { MainDbConfigModule } from '@common/config/db/config.module';
import { MainDbConfigService } from '@common/config/db/config.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './module/auth/auth.module';
import { UserModule } from './module/user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { path as appRoot } from 'app-root-path';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';

import { BullModule } from '@nestjs/bull';
import { CommonServiceModule } from '@common/services/common.module';
import { NodemailerModule } from './module/nodemailer/nodemailer.module';
import { LogsDbModule } from '@common/config/logs-db/logs-db.module';
import { MasterModule } from './module/master/master.module';
import { CacheModule } from './module/cache/cache.module';
import { LiveChatModule } from './module/livechat/chat.module';

@Module({
  imports: [
    AppConfigModule,
    AuthModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [MainDbConfigModule],
      inject: [MainDbConfigService],
      // Use useFactory, useClass, or useExisting
      // to configure the DataSourceOptions.
      useFactory: (config: MainDbConfigService) => config.typeORMConfig(),
      // dataSource receives the configured DataSourceOptions
      // and returns a Promise<DataSource>.
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    BullBoardModule.forRoot({
      route: '/admin/queues',
      adapter: ExpressAdapter, // Or FastifyAdapter from `@bull-board/fastify`
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(`${appRoot}/../public`),
    }),
    UserModule,
    CommonServiceModule,
    NodemailerModule,
    CacheModule,
    MasterModule,
    LiveChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
