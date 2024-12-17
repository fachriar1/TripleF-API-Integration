import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SummaryProfileDaily } from './summary_profile_daily.entity';
import { SummaryProfileDailyRepository } from './summary_profile_daily.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SummaryProfileDaily])],
  providers: [SummaryProfileDailyRepository],
  exports: [TypeOrmModule, SummaryProfileDailyRepository],
})
export class SummaryProfileDailyModule {}
