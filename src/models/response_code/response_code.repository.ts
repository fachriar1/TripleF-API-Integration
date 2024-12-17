import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { ResponseCode } from './response_code.entity';

@Injectable()
export class ResponseCodeRepository extends Repository<ResponseCode> {
  constructor(private dataSource: DataSource) {
    super(ResponseCode, dataSource.createEntityManager());
  }
}
