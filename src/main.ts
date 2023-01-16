import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from './Common/logger/Logger';
import { HttpExceptionFilter } from './Common/filter/HttpExceptionFilter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
