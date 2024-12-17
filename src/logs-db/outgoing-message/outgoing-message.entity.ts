import {
  Entity,
  ObjectId,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class OutgoingMessage {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  messageId: string;

  @Column()
  message: string;

  @Column()
  from: number;

  @Column()
  to: number;

  @Column()
  template: string;

  @Column({ comment: '0/1->process, 2-> success, 3->failed' })
  status: number;

  @Column()
  reason: string;

  @Column({ comment: '1-> reply interaksi, 2-> push message' })
  type: number;

  @Column({ type: 'timestamp' })
  sendDate: Date;

  @Column()
  is_delete: number;

  @Column({ type: 'timestamp' })
  deleted_at: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
