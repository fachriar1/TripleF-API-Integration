import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { UserMobile } from '../user_mobile/user_mobile.entity';
import { SurveyAnswer } from '../survey_answer/survey_answer.entity';
import { SurveyQuestionDet } from '../survey_question_det/survey_question_det.entity';

@Entity()
export class SurveyAnswerDet {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => SurveyAnswer, (item) => item.id)
  surveyAnswer: SurveyAnswer;
  @Column({ default: null, nullable: true })
  surveyAnswerId: number;

  @ManyToOne(() => SurveyQuestionDet, (item) => item.id)
  surveyQuestionDet: SurveyQuestionDet;
  @Column({ default: null, nullable: true })
  surveyQuestionDetId: number;

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
