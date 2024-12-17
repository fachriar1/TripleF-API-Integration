import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sales } from './sales.entity';
import { SalesRepository } from './sales.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Sales])],
  providers: [SalesRepository],
  exports: [TypeOrmModule, SalesRepository],
})
export class SalesModule {}
