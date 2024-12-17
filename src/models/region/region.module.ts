import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Regions } from './region.entity';
import { RegionRepository } from './region.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Regions])],
  providers: [RegionRepository],
  exports: [TypeOrmModule, RegionRepository],
})
export class RegionModule {}
