import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Banner } from './banner.entity';

@Injectable()
export class BannerRepository extends Repository<Banner> {
  constructor(private dataSource: DataSource) {
    super(Banner, dataSource.createEntityManager());
  }
}
