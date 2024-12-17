import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './city.entity';
import { CityRepository } from './city.repository';

@Module({
  imports: [TypeOrmModule.forFeature([City])],
  providers: [CityRepository],
  exports: [TypeOrmModule, CityRepository],
})
export class CityModule {}
