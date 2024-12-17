import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvalidReason } from './invalid_reason.entity';
import { InvalidReasonRepository } from './invalid_reason.repository';

@Module({
  imports: [TypeOrmModule.forFeature([InvalidReason])],
  providers: [InvalidReasonRepository],
  exports: [TypeOrmModule, InvalidReasonRepository],
})
export class InvalidReasonModule {}
