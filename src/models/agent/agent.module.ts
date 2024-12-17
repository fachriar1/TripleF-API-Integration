import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agent } from './agent.entity';
import { AgentRepository } from './agent.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Agent])],
  providers: [AgentRepository],
  exports: [TypeOrmModule, AgentRepository],
})
export class AgentEntityModule {}
