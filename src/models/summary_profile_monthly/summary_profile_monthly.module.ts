import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SummaryProfileMonthly } from './summary_profile_monthly.entity';
import { SummaryProfileMonthlyRepository } from './summary_profile_monthly.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SummaryProfileMonthly])],
  providers: [SummaryProfileMonthlyRepository],
  exports: [TypeOrmModule, SummaryProfileMonthlyRepository],
})
export class SummaryProfileMonthlyModule {}
