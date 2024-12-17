import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Winner } from './winner.entity';
import { WinnerRepository } from './winner.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Winner])],
  providers: [WinnerRepository],
  exports: [TypeOrmModule, WinnerRepository],
})
export class WinnerModule {}
