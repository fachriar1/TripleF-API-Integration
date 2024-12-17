import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { IncomingMessage } from './incoming-message.entity';

@Injectable()
export class IncomingMessageRepository extends Repository<IncomingMessage> {
  constructor(private dataSource: DataSource) {
    super(IncomingMessage, dataSource.createEntityManager());
  }
}
