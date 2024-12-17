import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogRequest } from './log_request.entity';
import { LogRequestRepository } from './log_request.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LogRequest])],
  providers: [LogRequestRepository],
  exports: [TypeOrmModule, LogRequestRepository],
})
export class LogRequestModule {}
