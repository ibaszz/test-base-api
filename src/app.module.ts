import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './Common/logger';
import { LoggerMiddleware } from './Common/middleware/LoggerMiddleware';

@Module({
  imports: [LoggerModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [LoggerModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
