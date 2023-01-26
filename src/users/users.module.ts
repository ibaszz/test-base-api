import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { LoggerModule } from 'src/Common/logger';
import { DBModule } from 'src/config/db';
import { UsersService } from './users.service';

@Module({
  imports: [
    LoggerModule,
    CacheModule.register<any>({
      store: redisStore,
      // Store-specific configuration:
      host: 'localhost',
      port: 6379,
    }),
    DBModule,
  ],
  providers: [UsersService, LoggerModule],
  exports: [UsersService],
})
export class UsersModule {}
