import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SummaryProfileWeekly } from './summary_profile_weekly.entity';
import { SummaryProfileWeeklyRepository } from './summary_profile_weekly.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SummaryProfileWeekly])],
  providers: [SummaryProfileWeeklyRepository],
  exports: [TypeOrmModule, SummaryProfileWeeklyRepository],
})
export class SummaryProfileWeeklyModule {}
