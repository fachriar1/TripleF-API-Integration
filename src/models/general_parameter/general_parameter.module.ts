import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneralParameter } from './general_parameter.entity';
import { GeneralParameterRepository } from './general_parameter.repository';

@Module({
  imports: [TypeOrmModule.forFeature([GeneralParameter])],
  providers: [GeneralParameterRepository],
  exports: [TypeOrmModule, GeneralParameterRepository],
})
export class GeneralParameterModule {}
