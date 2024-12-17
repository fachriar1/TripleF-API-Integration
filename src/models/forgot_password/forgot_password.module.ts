import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ForgotPassword } from './forgot_password.entity';
import { ForgotPasswordRepository } from './forgot_password.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ForgotPassword])],
  providers: [ForgotPasswordRepository],
  exports: [TypeOrmModule, ForgotPasswordRepository],
})
export class ForgotPasswordModule {}
