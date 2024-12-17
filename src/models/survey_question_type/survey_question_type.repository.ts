import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { SurveyQuestionType } from './survey_question_type.entity';

@Injectable()
export class SurveyQuestionTypeRepository extends Repository<SurveyQuestionType> {
  constructor(private dataSource: DataSource) {
    super(SurveyQuestionType, dataSource.createEntityManager());
  }
}
