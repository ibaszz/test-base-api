import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './Common/logger';
import { LoggerMiddleware } from './Common/middleware/LoggerMiddleware';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { RedisModule } from './config/redis';
import { RateLimitModule } from './config/rate-limit';

@Module({
  imports: [LoggerModule, AuthModule, RedisModule, RateLimitModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [LoggerModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
