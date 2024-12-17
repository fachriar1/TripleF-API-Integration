import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { SurveyType } from './survey_type.entity';

@Injectable()
export class SurveyTypeRepository extends Repository<SurveyType> {
  constructor(private dataSource: DataSource) {
    super(SurveyType, dataSource.createEntityManager());
  }
}
