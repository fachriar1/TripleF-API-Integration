import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { ProductCategory } from './product_category.entity';

@Injectable()
export class ProductCategoryRepository extends Repository<ProductCategory> {
  constructor(private dataSource: DataSource) {
    super(ProductCategory, dataSource.createEntityManager());
  }
}
