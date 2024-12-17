import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reply } from './reply.entity';
import { ReplyRepository } from './reply.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Reply])],
  providers: [ReplyRepository],
  exports: [TypeOrmModule, ReplyRepository],
})
export class ReplyModule {}
