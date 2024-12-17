import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Periode } from './periode.entity';
import { PeriodeRepository } from './periode.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Periode])],
  providers: [PeriodeRepository],
  exports: [TypeOrmModule, PeriodeRepository],
})
export class PeriodeModule {}
