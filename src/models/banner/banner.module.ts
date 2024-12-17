import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banner } from './banner.entity';
import { BannerRepository } from './banner.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Banner])],
  providers: [BannerRepository],
  exports: [TypeOrmModule, BannerRepository],
})
export class BannerModule {}
