import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { ReplyType } from './reply.entity';

@Injectable()
export class MediaRepository extends Repository<ReplyType> {
  constructor(private dataSource: DataSource) {
    super(ReplyType, dataSource.createEntityManager());
  }
}
