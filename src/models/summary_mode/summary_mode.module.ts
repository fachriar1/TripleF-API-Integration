import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SummaryMode } from './summary_mode.entity';
import { SummaryModeRepository } from './summary_mode.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SummaryMode])],
  providers: [SummaryModeRepository],
  exports: [TypeOrmModule, SummaryModeRepository],
})
export class SummaryModeModule {}
