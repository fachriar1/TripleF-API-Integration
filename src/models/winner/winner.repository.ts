import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Winner } from './winner.entity';

@Injectable()
export class WinnerRepository extends Repository<Winner> {
  constructor(private dataSource: DataSource) {
    super(Winner, dataSource.createEntityManager());
  }
}
