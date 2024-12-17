import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { TransformInterceptor } from '@common/interceptors/transform.interceptor';
import JwtAuthGuard from '@common/guards/JwtAuth.guards';
import { User } from '@common/decorators/param.user.decorator';
import {
  CreateChatDTO,
  UpdateRatingChatDTO,
  WebhookDTO,
} from 'src/dto/chat.dto';

@UseInterceptors(TransformInterceptor)
@ApiSecurity('authentication')
@Controller('api/chat')
@ApiTags('Chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('/detail/:id')
  @UseGuards(JwtAuthGuard)
  async chatById(@User() user, @Param('id') id: number) {
    return this.chatService.chatById(user, id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async chat(@User() user) {
    return this.chatService.chat(user);
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  async createChat(@User() user, @Body() body: CreateChatDTO) {
    return this.chatService.createChat(user, body);
  }

  @Put('/rating/:id')
  @UseGuards(JwtAuthGuard)
  async updateRatingChat(
    @User() user,
    @Param('id') id: number,
    @Body() body: UpdateRatingChatDTO,
  ) {
    return this.chatService.updateRatingChat(user, id, body);
  }

  @Post('/webhook')
  async webhook(@Body() body: WebhookDTO) {
    return this.chatService.webhook(body);
  }
}
