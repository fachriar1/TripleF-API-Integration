import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { SurveyQuestion } from './survey_question.entity';

@Injectable()
export class SurveyQuestionRepository extends Repository<SurveyQuestion> {
  constructor(private dataSource: DataSource) {
    super(SurveyQuestion, dataSource.createEntityManager());
  }
}
