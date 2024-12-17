import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { Topic } from '../topic/topic.entity';
import { Users } from '../user/user.entity';
import { Agent } from '../agent/agent.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Users, (user) => user.id)
  user: Users;
  @Index()
  @Column({ default: null, nullable: true })
  userId: number;

  @ManyToOne(() => Agent, (agent) => agent.id)
  agent: Agent;
  @Index()
  @Column({ default: null, nullable: true })
  agentId: number;

  @Column({ type: 'int' })
  conversationId: number;

  @Column({ type: 'varchar', length: 255 })
  sourceId: string;

  @Column({ type: 'varchar', length: 255 })
  pubsub_token: string;

  @ManyToOne(() => Topic, (topic) => topic.id)
  topic: Topic;
  @Index()
  @Column({ default: null, nullable: true })
  topicId: number;

  @Column({ type: 'smallint', default: 0 })
  rating: number;

  @Column({ type: 'smallint', default: 1, comment: '0->resolved, 1-> active' })
  status: number;

  @Column({ type: 'smallint', default: 0 })
  is_deleted: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'NULL',
    nullable: true,
  })
  deleted_at: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: string;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: string;
}
