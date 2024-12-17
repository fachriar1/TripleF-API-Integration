import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Otp } from './otp.entity';

@Injectable()
export class OtpRepository extends Repository<Otp> {
  constructor(private dataSource: DataSource) {
    super(Otp, dataSource.createEntityManager());
  }
}
