import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSummary } from './user-summary.entity';
import { UserSummaryRepository } from './user-summary.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserSummary])],
  providers: [UserSummaryRepository],
  exports: [TypeOrmModule, UserSummaryRepository],
})
export class UserSummaryModule {}
