import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntriesVariant } from './entries_variant.entity';
import { EntriesVariantRepository } from './entries_variant.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EntriesVariant])],
  providers: [EntriesVariantRepository],
  exports: [TypeOrmModule, EntriesVariantRepository],
})
export class EntriesVariantModule {}
