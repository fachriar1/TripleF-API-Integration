import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Allocation } from './allocation.entity';
import { AllocationRepository } from './allocation.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Allocation])],
  providers: [AllocationRepository],
  exports: [TypeOrmModule, AllocationRepository],
})
export class AllocationModule {}
