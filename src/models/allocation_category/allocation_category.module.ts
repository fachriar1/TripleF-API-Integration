import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllocationCategory } from './allocation_category.entity';
import { AllocationCategoryRepository } from './allocation_category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AllocationCategory])],
  providers: [AllocationCategoryRepository],
  exports: [TypeOrmModule, AllocationCategoryRepository],
})
export class AllocationCategoryModule {}
