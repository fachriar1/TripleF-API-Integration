import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { SurveyAnswerDet } from './survey_answer_det.entity';

@Injectable()
export class SurveyAnswerDetRepository extends Repository<SurveyAnswerDet> {
  constructor(private dataSource: DataSource) {
    super(SurveyAnswerDet, dataSource.createEntityManager());
  }
}
