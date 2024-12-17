import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReplyType } from './reply.entity';
import { MediaRepository } from './reply.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ReplyType])],
  providers: [MediaRepository],
  exports: [TypeOrmModule, MediaRepository],
})
export class ReplyTypeModule {}
