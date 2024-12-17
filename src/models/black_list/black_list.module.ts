import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlackList } from './black_list.entity';
import { BlackListRepository } from './black_list.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BlackList])],
  providers: [BlackListRepository],
  exports: [TypeOrmModule, BlackListRepository],
})
export class BlackListModule {}
