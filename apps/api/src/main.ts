import { AppModule } from './app/app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // validate all endpoints against dto
  app.enableCors(); // required to prevent cors errors
  await app.listen(3000);

}

bootstrap();
