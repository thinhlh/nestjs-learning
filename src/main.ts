import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,

    // This 2 below option enable the application to transform input to the declared type
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    }
  }));
  await app.listen(3000);
}
bootstrap();
