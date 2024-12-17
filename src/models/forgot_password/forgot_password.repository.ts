import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { ForgotPassword } from './forgot_password.entity';

@Injectable()
export class ForgotPasswordRepository extends Repository<ForgotPassword> {
  constructor(private dataSource: DataSource) {
    super(ForgotPassword, dataSource.createEntityManager());
  }
}
