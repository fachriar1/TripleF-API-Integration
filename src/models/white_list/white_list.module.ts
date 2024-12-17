import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WhiteList } from './white_list.entity';
import { WhiteListRepository } from './white_list.repository';

@Module({
  imports: [TypeOrmModule.forFeature([WhiteList])],
  providers: [WhiteListRepository],
  exports: [TypeOrmModule, WhiteListRepository],
})
export class WhiteListModule {}
