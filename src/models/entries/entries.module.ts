import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entries } from './entries.entity';
import { EntriesRepository } from './entries.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Entries])],
  providers: [EntriesRepository],
  exports: [TypeOrmModule, EntriesRepository],
})
export class EntriesModule {}
