import { ApiProperty } from '@nestjs/swagger';

class AdditionalAttributes {}

class CustomAttributes {
  @ApiProperty()
  issue: string;
  @ApiProperty()
  notes: string;
}

class Sender {
  @ApiProperty({ type: AdditionalAttributes })
  additional_attributes: AdditionalAttributes;
  @ApiProperty({ type: AdditionalAttributes })
  custom_attributes: AdditionalAttributes;
  @ApiProperty()
  email: string | string;
  @ApiProperty()
  id: number;
  @ApiProperty()
  identifier: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  phone_number: string;
  @ApiProperty()
  thumbnail: string;
  @ApiProperty()
  type: string;
}

class Assignee {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  available_name: string;
  @ApiProperty()
  avatar_url: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  availability_status: string | null;
  @ApiProperty()
  thumbnail: string;
}

class Meta {
  @ApiProperty()
  sender: Sender;
  @ApiProperty()
  assignee: Assignee;
  @ApiProperty()
  team: string;
  @ApiProperty()
  hmac_verified: boolean;
}

class Message {
  @ApiProperty()
  id: number;
  @ApiProperty()
  content: string;
  @ApiProperty()
  account_id: number;
  @ApiProperty()
  inbox_id: number;
  @ApiProperty()
  conversation_id: number;
  @ApiProperty()
  message_type: number;
  @ApiProperty()
  created_at: number;
  @ApiProperty()
  updated_at: string;
  @ApiProperty()
  private: boolean;
  @ApiProperty()
  status: string;
  @ApiProperty()
  source_id: string;
  @ApiProperty()
  content_type: string;
  @ApiProperty({ type: AdditionalAttributes })
  content_attributes: AdditionalAttributes;
  @ApiProperty()
  sender_type: string;
  @ApiProperty()
  sender_id: number;
  @ApiProperty({ type: AdditionalAttributes })
  external_source_ids: AdditionalAttributes;
  @ApiProperty({ type: AdditionalAttributes })
  additional_attributes: AdditionalAttributes;
  @ApiProperty()
  processed_message_content: string;
  @ApiProperty({ type: AdditionalAttributes })
  sentiment: AdditionalAttributes;
  @ApiProperty()
  conversation: any;
  @ApiProperty()
  sender: any;
}

class Contactinbox {
  @ApiProperty()
  id: number;
  @ApiProperty()
  contact_id: number;
  @ApiProperty()
  inbox_id: number;
  @ApiProperty()
  source_id: string;
  @ApiProperty()
  created_at: string;
  @ApiProperty()
  updated_at: string;
  @ApiProperty()
  hmac_verified: boolean;
  @ApiProperty()
  pubsub_token: string;
}

class PayloadWebhookDTO {
  @ApiProperty({ type: AdditionalAttributes })
  additional_attributes: AdditionalAttributes;
  @ApiProperty()
  can_reply: boolean;
  @ApiProperty()
  channel: string;
  @ApiProperty({ type: Contactinbox })
  contact_inbox: Contactinbox;
  @ApiProperty()
  id: number;
  @ApiProperty()
  inbox_id: number;
  @ApiProperty({ type: [Message] })
  messages: Message[];
  @ApiProperty()
  labels: any[];
  @ApiProperty({ type: Meta })
  meta: Meta;
  @ApiProperty()
  status: string;
  @ApiProperty({ type: CustomAttributes })
  custom_attributes: CustomAttributes;
  @ApiProperty()
  snoozed_until: string;
  @ApiProperty()
  unread_count: number;
  @ApiProperty()
  first_reply_created_at: string;
  @ApiProperty()
  priority: string;
  @ApiProperty()
  waiting_since: number;
  @ApiProperty()
  agent_last_seen_at: number;
  @ApiProperty()
  contact_last_seen_at: number;
  @ApiProperty()
  last_activity_at: number;
  @ApiProperty()
  timestamp: number;
  @ApiProperty()
  created_at: number;
  @ApiProperty()
  event: string;
  @ApiProperty()
  changed_attributes: string;
}

export class CreateChatDTO {
  @ApiProperty()
  conversationId: number;
  @ApiProperty()
  topicId: number;
  @ApiProperty()
  sourceId: string;
  @ApiProperty()
  pubsub_token: string;
}

export class UpdateRatingChatDTO {
  @ApiProperty()
  rating: number;
}

export class WebhookDTO extends PayloadWebhookDTO {}
