import {
  Entity,
  ObjectId,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class IncomingMessage {
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
  mediaType: string;

  @Column()
  media: string;

  @Column()
  waName: string;

  @Column({ type: 'timestamp' })
  receiveTime: string;

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
