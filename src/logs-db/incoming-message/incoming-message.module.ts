import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IncomingMessage } from './incoming-message.entity';
import { IncomingMessageRepository } from './incoming-message.repository';

@Module({
  imports: [TypeOrmModule.forFeature([IncomingMessage], 'logs_connection')],
  providers: [IncomingMessageRepository],
  exports: [TypeOrmModule, IncomingMessageRepository],
})
export class IncomingMessageModule {}
