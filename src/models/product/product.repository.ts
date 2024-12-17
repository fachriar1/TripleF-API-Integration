import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductRepository extends Repository<Product> {
  constructor(private dataSource: DataSource) {
    super(Product, dataSource.createEntityManager());
  }
}
