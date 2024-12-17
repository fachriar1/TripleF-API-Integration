import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tnc } from './tnc.entity';
import { TncRepository } from './tnc.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Tnc])],
  providers: [TncRepository],
  exports: [TypeOrmModule, TncRepository],
})
export class TncModule {}
