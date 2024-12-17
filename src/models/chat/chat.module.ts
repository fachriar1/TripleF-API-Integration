import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './chat.entity';
import { ChatRepository } from './chat.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Chat])],
  providers: [ChatRepository],
  exports: [TypeOrmModule, ChatRepository],
})
export class ChatModule {}
