import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { LoggerModule } from 'src/Common/logger';
import { DBModule } from 'src/config/db';
import { RedisModule } from 'src/config/redis';
import { UsersService } from './users.service';

@Module({
  imports: [
    LoggerModule,
    RedisModule,
    DBModule,
  ],
  providers: [UsersService, LoggerModule],
  exports: [UsersService],
})
export class UsersModule {}
