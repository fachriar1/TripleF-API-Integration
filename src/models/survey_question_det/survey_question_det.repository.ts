import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { SurveyQuestionDet } from './survey_question_det.entity';

@Injectable()
export class SurveyQuestionDetRepository extends Repository<SurveyQuestionDet> {
  constructor(private dataSource: DataSource) {
    super(SurveyQuestionDet, dataSource.createEntityManager());
  }
}
