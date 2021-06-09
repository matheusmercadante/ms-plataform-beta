import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { APIPrefix } from '@constant/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const port = parseInt(process.env.SERVER_PORT);
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(APIPrefix.Version);
  app.enableCors();

  // await app.startAllMicroservicesAsync();
  await app.listen(port);
}
bootstrap();
