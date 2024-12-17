import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SummaryEntriesWeekly } from './summary_entries_weekly.entity';
import { SummaryEntriesWeeklyRepository } from './summary_entries_weekly.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SummaryEntriesWeekly])],
  providers: [SummaryEntriesWeeklyRepository],
  exports: [TypeOrmModule, SummaryEntriesWeeklyRepository],
})
export class SummaryEntriesWeeklyModule {}
