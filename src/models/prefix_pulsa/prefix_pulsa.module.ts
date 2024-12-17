import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrefixPulsa } from './prefix_pulsa.entity';
import { PrefixPulsaRepository } from './prefix_pulsa.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PrefixPulsa])],
  providers: [PrefixPulsaRepository],
  exports: [TypeOrmModule, PrefixPulsaRepository],
})
export class PrefixPulsaModule {}
