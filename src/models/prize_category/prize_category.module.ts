import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrizeCategory } from './prize_category.entity';
import { PrizeCategoryRepository } from './prize_category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PrizeCategory])],
  providers: [PrizeCategoryRepository],
  exports: [TypeOrmModule, PrizeCategoryRepository],
})
export class PrizeCategoryModule {}
