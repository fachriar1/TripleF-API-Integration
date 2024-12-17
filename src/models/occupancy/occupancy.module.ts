import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Occupancy } from './occupancy.entity';
import { OccupancyRepository } from './occupancy.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Occupancy])],
  providers: [OccupancyRepository],
  exports: [TypeOrmModule, OccupancyRepository],
})
export class OccupancyModule {}
