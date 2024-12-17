import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Otp } from './otp.entity';
import { OtpRepository } from './otp.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Otp])],
  providers: [OtpRepository],
  exports: [TypeOrmModule, OtpRepository],
})
export class OtpModule {}
