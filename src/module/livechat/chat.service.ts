import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateChatDTO,
  UpdateRatingChatDTO,
  WebhookDTO,
} from 'src/dto/chat.dto';
import { ChatRepository } from 'src/models/chat/chat.repository';

@Injectable()
export class ChatService {
  @InjectRepository(ChatRepository)
  private chatRepository: ChatRepository;

  async chatById(user, id: number) {
    const chat = await this.chatRepository
      .createQueryBuilder('chat')
      .innerJoinAndSelect('chat.user', 'user')
      .select([
        'chat.id AS id',
        'chat.conversationId AS conversation_id',
        'chat.sourceId AS source_id',
        'chat.pubsub_token AS pubsub_token',
        'chat.status AS status',
      ])
      .where('user.id = :userId AND chat.conversationId = :id', {
        userId: user.id,
        id,
      })
      .getRawOne();

    return chat;
  }

  async chat(user) {
    return await this.chatRepository
      .createQueryBuilder('chat')
      .innerJoin('chat.topic', 'topic')
      .select([
        'chat.id AS id',
        'chat.conversationId AS conversation_id',
        'chat.sourceId AS source_id',
        'topic.title AS title',
        'chat.rating AS rating',
        'chat.status AS status',
        'chat.created_at AS created_at',
      ])
      .where('chat.userId = :id', { id: user.id })
      .orderBy('chat.id', 'DESC')
      .getRawMany();
  }

  async createChat(user, param: CreateChatDTO) {
    await this.chatRepository.insert({
      userId: user.id,
      topicId: param.topicId,
      sourceId: param.sourceId,
      conversationId: param.conversationId,
      pubsub_token: param.pubsub_token,
    });
  }

  async updateRatingChat(user, id: number, param: UpdateRatingChatDTO) {
    await this.chatRepository.update(
      {
        id,
        userId: user.id,
      },
      { rating: param.rating },
    );
  }

  async webhook(param: WebhookDTO) {
    const getChat = await this.chatRepository.findOne({
      where: { conversationId: param.id },
    });

    if (getChat) {
      const checkAgentAvailable = getChat.agentId;
      const checkActiveStatus = getChat.status === 1;

      if (!checkAgentAvailable && param.meta?.assignee?.id) {
        await this.chatRepository.update(
          { conversationId: param.id },
          { agentId: param.meta.assignee.id },
        );
      }

      if (checkActiveStatus && param.status === 'resolved') {
        await this.chatRepository.update(
          {
            conversationId: param.id,
          },
          { rating: 5, status: 0 },
        );
      }
    }
  }
}
