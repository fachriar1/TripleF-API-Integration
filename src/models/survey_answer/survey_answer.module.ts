import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyAnswer } from './survey_answer.entity';
import { SurveyAnswerRepository } from './survey_answer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyAnswer])],
  providers: [SurveyAnswerRepository],
  exports: [TypeOrmModule, SurveyAnswerRepository],
})
export class SurveyAnswerModule {}
