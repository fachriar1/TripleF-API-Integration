import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { LoginSession } from './login_session.entity';

@Injectable()
export class LoginSessionRepository extends Repository<LoginSession> {
  constructor(private dataSource: DataSource) {
    super(LoginSession, dataSource.createEntityManager());
  }
}
