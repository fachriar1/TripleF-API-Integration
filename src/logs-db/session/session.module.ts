import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './session.entity';
import { SessionRepository } from './session.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Session], 'logs_connection')],
  providers: [SessionRepository],
  exports: [TypeOrmModule, SessionRepository],
})
export class SessionModule {}
