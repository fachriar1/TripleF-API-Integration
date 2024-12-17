import { AppConfigModule } from '@common/config/api/config.module';
import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { GeneralParameterModule } from 'src/models/general_parameter/general_parameter.module';

@Module({
  imports: [AppConfigModule, GeneralParameterModule],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonServiceModule {}
