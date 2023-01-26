import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerModule } from './Common/logger';
import { LoggerMiddleware } from './Common/middleware/LoggerMiddleware';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './config/redis';
import { RateLimitModule } from './config/rate-limit';
import { ProfileModule } from './profile/profile.module';
import { PemantauanModule } from './pemantauan/pemantauan.module';

@Module({
  imports: [
    LoggerModule,
    RedisModule,
    RateLimitModule,

    // route
    AuthModule,
    ProfileModule,
    PemantauanModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
