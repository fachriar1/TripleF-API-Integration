import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { SurveyAnswer } from './survey_answer.entity';

@Injectable()
export class SurveyAnswerRepository extends Repository<SurveyAnswer> {
  constructor(private dataSource: DataSource) {
    super(SurveyAnswer, dataSource.createEntityManager());
  }
}
