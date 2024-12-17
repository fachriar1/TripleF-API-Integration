import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Media } from './media.entity';

@Injectable()
export class MediaRepository extends Repository<Media> {
  constructor(private dataSource: DataSource) {
    super(Media, dataSource.createEntityManager());
  }
}
