import {ApiProperty} from '@nestjs/swagger';

export class PushNotificationUserDTO {
  @ApiProperty()
  userId: number;
  @ApiProperty()
  title: string;
  @ApiProperty()
  categoryId: number;
  @ApiProperty({required: false, enum: ["web", "app"]})
  type?: "web" | "app";
  @ApiProperty()
  body: string;
  @ApiProperty({required: false})
  headerId?: number;
  @ApiProperty({required: false})
  createdById?: number;
  @ApiProperty({required: false})
  methodeId?: number;
  @ApiProperty({required: false})
  masterCoreDistrictId?: number;
  @ApiProperty({required: false})
  masterCoreVillageId?: number;
  @ApiProperty({required: false})
  isInsert?: boolean;
  @ApiProperty({required: false})
  data?: boolean;
}

export class ListNotificationDTO {
  @ApiProperty()
  limit: number;
  @ApiProperty()
  lastId: number;
  @ApiProperty()
  categoryId: number;
}
