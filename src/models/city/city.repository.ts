import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { City } from './city.entity';

@Injectable()
export class CityRepository extends Repository<City> {
  constructor(private dataSource: DataSource) {
    super(City, dataSource.createEntityManager());
  }
}
