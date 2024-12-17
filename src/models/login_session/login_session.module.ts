import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginSession } from './login_session.entity';
import { LoginSessionRepository } from './login_session.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LoginSession])],
  providers: [LoginSessionRepository],
  exports: [TypeOrmModule, LoginSessionRepository],
})
export class LoginSessionModule {}
