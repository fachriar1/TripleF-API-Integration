import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Province } from './province.entity';
import { ProvinceRepository } from './province.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Province])],
  providers: [ProvinceRepository],
  exports: [TypeOrmModule, ProvinceRepository],
})
export class ProvinceModule {}
