import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prize } from './prize.entity';
import { PrizeRepository } from './prize.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Prize])],
  providers: [PrizeRepository],
  exports: [TypeOrmModule, PrizeRepository],
})
export class PrizeModule {}
