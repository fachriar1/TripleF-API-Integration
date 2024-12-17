import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { NotificationRepository } from './notification.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  providers: [NotificationRepository],
  exports: [TypeOrmModule, NotificationRepository],
})
export class NotificationModule {}
