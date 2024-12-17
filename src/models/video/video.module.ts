import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './video.entity';
import { VideoRepository } from './video.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Video])],
  providers: [VideoRepository],
  exports: [TypeOrmModule, VideoRepository],
})
export class VideoModule {}
