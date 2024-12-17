import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrizeType } from './prize_type.entity';
import { PrizeTypeRepository } from './prize_type.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PrizeType])],
  providers: [PrizeTypeRepository],
  exports: [TypeOrmModule, PrizeTypeRepository],
})
export class PrizeTypeModule {}
