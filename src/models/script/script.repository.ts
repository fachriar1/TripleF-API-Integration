import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Script } from './script.entity';

@Injectable()
export class ScriptRepository extends Repository<Script> {
  constructor(private dataSource: DataSource) {
    super(Script, dataSource.createEntityManager());
  }
}
