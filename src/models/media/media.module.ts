import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './media.entity';
import { MediaRepository } from './media.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Media])],
  providers: [MediaRepository],
  exports: [TypeOrmModule, MediaRepository],
})
export class MediaModule {}
