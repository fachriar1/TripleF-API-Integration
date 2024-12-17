import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Version } from './version.entity';
import { VersionRepository } from './version.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Version])],
  providers: [VersionRepository],
  exports: [TypeOrmModule, VersionRepository],
})
export class VersionModule {}
