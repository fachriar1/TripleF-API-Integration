import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoreArea } from './store_area.entity';
import { StoreAreaRepository } from './store_area.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StoreArea])],
  providers: [StoreAreaRepository],
  exports: [TypeOrmModule, StoreAreaRepository],
})
export class StoreAreaModule {}
