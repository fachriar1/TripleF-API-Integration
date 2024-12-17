import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Users } from './user.entity';

@Injectable()
export class UserRepository extends Repository<Users> {
  constructor(private dataSource: DataSource) {
    super(Users, dataSource.createEntityManager());
  }
}
