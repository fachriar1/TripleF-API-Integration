import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRankPeriode } from './user-rank_periode.entity';
import { UserRankPeriodeRepository } from './user-rank_periode.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRankPeriode])],
  providers: [UserRankPeriodeRepository],
  exports: [TypeOrmModule, UserRankPeriodeRepository],
})
export class UserRankPeriodeModule {}
