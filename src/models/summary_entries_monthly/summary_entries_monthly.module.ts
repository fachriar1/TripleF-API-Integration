import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SummaryEntriesMonthly } from './summary_entries_monthly.entity';
import { SummaryEntriesMonthlyRepository } from './summary_entries_monthly.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SummaryEntriesMonthly])],
  providers: [SummaryEntriesMonthlyRepository],
  exports: [TypeOrmModule, SummaryEntriesMonthlyRepository],
})
export class SummaryEntriesMonthlyModule {}
