import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from './Common/logger/Logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger))
  await app.listen(3000);
}
bootstrap();
