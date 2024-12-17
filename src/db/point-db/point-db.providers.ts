import { PointDbConfigService } from '@common/config/point-db/config.service';
import { createConnection } from 'mongoose';

export const PointDBProvider = [
  {
    provide: 'POINT_DB_CONNECTION',
    inject: [PointDbConfigService],
    useFactory: async (PointDbConfigService: PointDbConfigService) =>
      await createConnection(PointDbConfigService.typeORMConfig, {
        directConnection: true,
      }),
  },
];
