import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Script } from './script.entity';
import { ScriptRepository } from './script.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Script])],
  exports: [TypeOrmModule, ScriptRepository],
  providers: [ScriptRepository],
})
export class ScriptModule {}
