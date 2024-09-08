import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { useRequestLogging } from './middlewares/logging';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useRequestLogging(app);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(4000);
}

bootstrap();
