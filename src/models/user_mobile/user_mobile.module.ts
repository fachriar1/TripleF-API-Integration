import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMobile } from './user_mobile.entity';
import { UserMobileRepository } from './user_mobile.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserMobile])],
  providers: [UserMobileRepository],
  exports: [TypeOrmModule, UserMobileRepository],
})
export class UserMobileModule {}
