import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './topic.entity';
import { TopicRepository } from './topic.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Topic])],
  providers: [TopicRepository],
  exports: [TypeOrmModule, TopicRepository],
})
export class TopicModule {}
