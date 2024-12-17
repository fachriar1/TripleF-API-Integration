import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UserRepository],
  exports: [TypeOrmModule, UserRepository],
})
export class UsersModule {}
