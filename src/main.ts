import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { EnvService } from '@adapters/drivens/infra/envs/env.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const envService = app.get(EnvService);
  app.use(express.json());
  const port = envService.get('PORT');

  await app.listen(port);
}
bootstrap();
