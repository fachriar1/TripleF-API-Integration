import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyQuestionType } from './survey_question_type.entity';
import { SurveyQuestionTypeRepository } from './survey_question_type.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyQuestionType])],
  providers: [SurveyQuestionTypeRepository],
  exports: [TypeOrmModule, SurveyQuestionTypeRepository],
})
export class SurveyQuestionTypeModule {}
