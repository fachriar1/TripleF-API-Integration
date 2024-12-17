import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessDet } from './access_det.entity';
import { AccessDetRepository } from './access_det.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AccessDet])],
  providers: [AccessDetRepository],
  exports: [TypeOrmModule, AccessDetRepository],
})
export class AccessDetModule {}
