import { Module } from '@nestjs/common';
import { PointDbService } from './point-db.service';
import { PointDbConfigModule } from '@common/config/point-db/config.module';
import { PointDbConfigService } from '@common/config/point-db/config.service';
import { baseModelProviders } from './models/model.base.providers';
import { PointDBProvider } from './point-db.providers';

@Module({
  imports: [PointDbConfigModule],
  providers: [
    PointDbService,
    PointDbConfigService,
    ...baseModelProviders,
    ...PointDBProvider,
  ],
  exports: [PointDbService, ...baseModelProviders, ...PointDBProvider],
})
export class PointDbModule {}
