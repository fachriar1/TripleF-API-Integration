import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

import { UserMobile } from '../user_mobile/user_mobile.entity';
import { SurveyQuestion } from '../survey_question/survey_question.entity';
@Entity()
export class SurveyQuestionDet {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => SurveyQuestion, (item) => item.id)
  surveyQuestion: SurveyQuestion;
  @Column({ default: null, nullable: true })
  surveyQuestionId: number;

  @Column({ type: 'text', default: '' })
  description: string;

  @Column({ type: 'varchar', length: '100', default: '' })
  value: string;

  @Column({ type: 'int2', default: 0 })
  sort: string;

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
