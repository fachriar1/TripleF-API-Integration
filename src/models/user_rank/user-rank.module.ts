import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRank } from './user-rank.entity';
import { UserRankRepository } from './user-rank.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRank])],
  providers: [UserRankRepository],
  exports: [TypeOrmModule, UserRankRepository],
})
export class UserRankModule {}
