import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Video } from './video.entity';

@Injectable()
export class VideoRepository extends Repository<Video> {
  constructor(private dataSource: DataSource) {
    super(Video, dataSource.createEntityManager());
  }
}
