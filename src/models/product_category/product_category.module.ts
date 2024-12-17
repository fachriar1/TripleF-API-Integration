import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './product_category.entity';
import { ProductCategoryRepository } from './product_category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory])],
  providers: [ProductCategoryRepository],
  exports: [TypeOrmModule, ProductCategoryRepository],
})
export class ProductCategoryModule {}
