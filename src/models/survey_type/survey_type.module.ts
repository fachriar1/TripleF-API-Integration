import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyType } from './survey_type.entity';
import { SurveyTypeRepository } from './survey_type.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyType])],
  providers: [SurveyTypeRepository],
  exports: [TypeOrmModule, SurveyTypeRepository],
})
export class SurveyTypeModule {}
