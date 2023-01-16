import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from './Common/logger/Logger';
import { HttpExceptionFilter } from './Common/filter/HttpExceptionFilter';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const logger = app.get(Logger);
  app.use(helmet(), compression());
  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter(logger));
  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'version',
  });
  await app.listen(3000);
}
bootstrap();
