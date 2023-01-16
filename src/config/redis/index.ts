import { CacheModule, CACHE_MANAGER, Module } from '@nestjs/common';
import { Cache } from 'cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { ClientOpts } from 'redis';

@Module({
  imports: [
    CacheModule.register<ClientOpts>({
      store: redisStore,
      // Store-specific configuration:
      host: 'localhost',
      port: 6379,
    }),
  ],
  exports: [
    CacheModule.register<ClientOpts>({
      store: redisStore,
      // Store-specific configuration:
      host: 'localhost',
      port: 6379,
    }),
  ],
})
export class RedisModule {}
