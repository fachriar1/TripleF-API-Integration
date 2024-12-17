import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatModule } from 'src/models/chat/chat.module';

@Module({
  controllers: [ChatController],
  providers: [ChatService],
  imports: [ChatModule],
})
export class LiveChatModule {}
