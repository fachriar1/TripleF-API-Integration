import {
  Entity,
  ObjectId,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Session {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ default: '0' })
  last_journey: string;

  @Column({ default: '' })
  sender: string;

  @Column({ default: 0 })
  entriesId: number;

  @Column({ default: 1 })
  status: number;

  @Column({ default: 0 })
  expired: number;

  @Column({ default: 0 })
  is_delete: number;

  @Column({ type: 'timestamp', default: null })
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
