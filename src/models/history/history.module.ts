import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from './history.entity';
import { HistoryRepository } from './history.repository';

@Module({
  imports: [TypeOrmModule.forFeature([History])],
  providers: [HistoryRepository],
  exports: [TypeOrmModule, HistoryRepository],
})
export class HistoryModule {}
