import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseCode } from './response_code.entity';
import { ResponseCodeRepository } from './response_code.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ResponseCode])],
  providers: [ResponseCodeRepository],
  exports: [TypeOrmModule, ResponseCodeRepository],
})
export class ResponseCodeModule {}
