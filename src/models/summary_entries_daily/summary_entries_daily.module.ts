import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SummaryEntriesDaily } from './summary_entries_daily.entity';
import { SummaryEntriesDailyRepository } from './summary_entries_daily.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SummaryEntriesDaily])],
  providers: [SummaryEntriesDailyRepository],
  exports: [TypeOrmModule, SummaryEntriesDailyRepository],
})
export class SummaryEntriesDailyModule {}
