import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Faq } from './faq.entity';
import { FaqRepository } from './faq.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Faq])],
  providers: [FaqRepository],
  exports: [TypeOrmModule, FaqRepository],
})
export class FaqModule {}
