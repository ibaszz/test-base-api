import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from './Common/logger/Logger';
import { HttpExceptionFilter } from './Common/filter/HttpExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger));
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
