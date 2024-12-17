import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryDetail } from './history_detail.entity';
import { HistoryDetailRepository } from './history_detail.repository';

@Module({
  imports: [TypeOrmModule.forFeature([HistoryDetail])],
  providers: [HistoryDetailRepository],
  exports: [TypeOrmModule, HistoryDetailRepository],
})
export class HistoryDetailModule {}
