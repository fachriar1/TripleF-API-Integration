import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllocationCity } from './allocation_city.entity';
import { AllocationCityRepository } from './allocation_city.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AllocationCity])],
  providers: [AllocationCityRepository],
  exports: [TypeOrmModule, AllocationCityRepository],
})
export class AllocationCityModule {}
