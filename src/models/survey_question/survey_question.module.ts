import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyQuestion } from './survey_question.entity';
import { SurveyQuestionRepository } from './survey_question.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyQuestion])],
  providers: [SurveyQuestionRepository],
  exports: [TypeOrmModule, SurveyQuestionRepository],
})
export class SurveyQuestionModule {}
