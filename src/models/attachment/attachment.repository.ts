import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Attachment } from './attachment.entity';

@Injectable()
export class AttachmentRepository extends Repository<Attachment> {
  constructor(private dataSource: DataSource) {
    super(Attachment, dataSource.createEntityManager());
  }
}
