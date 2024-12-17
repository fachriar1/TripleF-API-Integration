import { Module } from '@nestjs/common';
import { ScriptConfigService } from './config.service'; 

@Module({
  providers: [ScriptConfigService],
  exports: [ScriptConfigService]
})
export class ScriptConfigModule {}