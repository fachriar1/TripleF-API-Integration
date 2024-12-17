import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyAnswerDet } from './survey_answer_det.entity';
import { SurveyAnswerDetRepository } from './survey_answer_det.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyAnswerDet])],
  providers: [SurveyAnswerDetRepository],
  exports: [TypeOrmModule, SurveyAnswerDetRepository],
})
export class SurveyAnswerDetModule {}
