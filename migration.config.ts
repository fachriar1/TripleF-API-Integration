import { MainDbConfigService } from './src/common/config/db/config.service' 
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

const configService = new ConfigService()
const mainDbConfig = new MainDbConfigService(configService);
const datasource = new DataSource(mainDbConfig.typeORMConfig()); // config is one that is defined in datasource.config.ts file
datasource.initialize();
export default datasource; 