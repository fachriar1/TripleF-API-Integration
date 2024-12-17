import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Topic } from './topic.entity';

@Injectable()
export class TopicRepository extends Repository<Topic> {
  constructor(private dataSource: DataSource) {
    super(Topic, dataSource.createEntityManager());
  }
}
