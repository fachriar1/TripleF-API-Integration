import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Version } from './version.entity';

@Injectable()
export class VersionRepository extends Repository<Version> {
  constructor(private dataSource: DataSource) {
    super(Version, dataSource.createEntityManager());
  }
}
