import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { PrizeSetting } from './prize_setting.entity';

@Injectable()
export class PrizeSettingRepository extends Repository<PrizeSetting> {
  constructor(private dataSource: DataSource) {
    super(PrizeSetting, dataSource.createEntityManager());
  }
}
