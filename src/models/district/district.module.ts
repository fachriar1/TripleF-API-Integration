import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { District } from './district.entity';
import { DistrictRepository } from './district.repository';

@Module({
  imports: [TypeOrmModule.forFeature([District])],
  providers: [DistrictRepository],
  exports: [TypeOrmModule, DistrictRepository],
})
export class DistrictModule {}
