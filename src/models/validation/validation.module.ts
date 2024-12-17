import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Validation } from './validation.entity';
import { ValidationRepository } from './validation.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Validation])],
  providers: [ValidationRepository],
  exports: [TypeOrmModule, ValidationRepository],
})
export class ValidationModule {}
