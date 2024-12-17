import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Access } from './access.entity';
import { AccessRepository } from './access.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Access])],
  providers: [AccessRepository],
  exports: [TypeOrmModule, AccessRepository],
})
export class AccessModule {}
