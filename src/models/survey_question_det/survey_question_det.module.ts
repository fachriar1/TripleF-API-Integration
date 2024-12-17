import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyQuestionDet } from './survey_question_det.entity';
import { SurveyQuestionDetRepository } from './survey_question_det.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyQuestionDet])],
  providers: [SurveyQuestionDetRepository],
  exports: [TypeOrmModule, SurveyQuestionDetRepository],
})
export class SurveyQuestionDetModule {}
