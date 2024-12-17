import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { OutgoingMessage } from './outgoing-message.entity';

@Injectable()
export class OutgoingMessageRepository extends Repository<OutgoingMessage> {
  constructor(private dataSource: DataSource) {
    super(OutgoingMessage, dataSource.createEntityManager());
  }
}
