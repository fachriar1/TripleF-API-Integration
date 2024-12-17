import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { UserMobile } from '../user_mobile/user_mobile.entity';
import { SurveyQuestionType } from '../survey_question_type/survey_question_type.entity';
import { SurveyType } from '../survey_type/survey_type.entity';

@Entity()
export class SurveyQuestion {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => SurveyType, (item) => item.id)
  surveyType: SurveyType;
  @Column({ default: null, nullable: true })
  surveyTypeId: number;

  @ManyToOne(() => SurveyQuestionType, (item) => item.id)
  surveyQuestionType: SurveyQuestionType;
  @Column({ default: null, nullable: true })
  surveyQuestionTypeId: number;

  @Column({ type: 'int2', default: 0 })
  sort: string;

  @Column({ type: 'varchar', width: 5, default: '' })
  no: string;

  @Column({ type: 'int', default: 0 })
  header: number;

  @Column({ type: 'text', default: '' })
  description: string;

  @Column({ type: 'int2', default: 0 })
  max: number;

  @Column({ type: 'int2', default: 0 })
  min: number;

  @Column({ type: 'int2', default: 0 })
  required: number;

  @Column({ type: 'smallint', default: 1, comment: '0->in active,1-> active' })
  status: number;

  @Column({ type: 'smallint', default: 0 })
  is_deleted: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'NULL',
    nullable: true,
  })
  deleted_at: string;

  @ManyToOne(() => UserMobile, (user) => user.id)
  createdBy: UserMobile;
  @Column({ default: null, nullable: true })
  createdById: number;

  @ManyToOne(() => UserMobile, (user) => user.id)
  updatedBy: UserMobile;
  @Column({ default: null, nullable: true })
  updatedById: number;

  @ManyToOne(() => UserMobile, (user) => user.id)
  deletedBy: UserMobile;
  @Column({ default: null, nullable: true })
  deletedById: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: string;
}
