import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './store.entity';
import { StoreRepository } from './store.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Store])],
  providers: [StoreRepository],
  exports: [TypeOrmModule, StoreRepository],
})
export class StoreModule {}
