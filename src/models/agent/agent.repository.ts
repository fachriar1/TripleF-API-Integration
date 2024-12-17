import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Agent } from './agent.entity';

@Injectable()
export class AgentRepository extends Repository<Agent> {
  constructor(private dataSource: DataSource) {
    super(Agent, dataSource.createEntityManager());
  }
}
