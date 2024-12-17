import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MasterBrand } from './master_brand.entity';
import { MasterBrandRepository } from './master_brand.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MasterBrand])],
  providers: [MasterBrandRepository],
  exports: [TypeOrmModule, MasterBrandRepository],
})
export class MasterBrandModule {}
