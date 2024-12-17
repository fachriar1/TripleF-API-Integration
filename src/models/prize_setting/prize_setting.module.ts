import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrizeSetting } from './prize_setting.entity';
import { PrizeSettingRepository } from './prize_setting.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PrizeSetting])],
  providers: [PrizeSettingRepository],
  exports: [TypeOrmModule, PrizeSettingRepository],
})
export class PrizeSettingModule {}
