import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zipcode } from './zipcode.entity';
import { ZipcodeRepository } from './zipcode.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Zipcode])],
  providers: [ZipcodeRepository],
  exports: [TypeOrmModule, ZipcodeRepository],
})
export class ZipcodeModule {}
