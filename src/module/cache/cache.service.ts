import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class CacheService {
  private readonly redisClient: Redis;
  constructor() {
    this.redisClient = new Redis();
  }

  async get(cacheKey: string) {
    return this.redisClient.get(cacheKey);
  }

  async set(cacheKey: string, data: string, expired: number) {
    await this.redisClient.set(cacheKey, data, 'EX', expired);
  }

  async delete(cacheKey: string) {
    await this.redisClient.del(cacheKey);
  }
}
