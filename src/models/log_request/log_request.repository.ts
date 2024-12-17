import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { LogRequest } from './log_request.entity';

@Injectable()
export class LogRequestRepository extends Repository<LogRequest> {
  constructor(private dataSource: DataSource) {
    super(LogRequest, dataSource.createEntityManager());
  }
}
