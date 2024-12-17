import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OutgoingMessage } from './outgoing-message.entity';
import { OutgoingMessageRepository } from './outgoing-message.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OutgoingMessage], 'logs_connection')],
  providers: [OutgoingMessageRepository],
  exports: [TypeOrmModule, OutgoingMessageRepository],
})
export class OutgoingMessageModule {}
