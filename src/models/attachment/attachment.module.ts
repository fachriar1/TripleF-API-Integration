import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attachment } from './attachment.entity';
import { AttachmentRepository } from './attachment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Attachment])],
  providers: [AttachmentRepository],
  exports: [TypeOrmModule, AttachmentRepository],
})
export class AttachmentModule {}
