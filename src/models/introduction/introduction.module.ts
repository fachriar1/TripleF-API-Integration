import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Introduction } from './introduction.entity';
import { IntroductionRepository } from './introduction.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Introduction])],
  providers: [IntroductionRepository],
  exports: [TypeOrmModule, IntroductionRepository],
})
export class IntroductionModule {}
