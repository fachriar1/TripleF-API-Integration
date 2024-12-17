import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { UserMobile } from './user_mobile.entity';

@Injectable()
export class UserMobileRepository extends Repository<UserMobile> {
  constructor(private dataSource: DataSource) {
    super(UserMobile, dataSource.createEntityManager());
  }
}
