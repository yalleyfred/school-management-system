/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { json, urlencoded } from 'body-parser';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';

  app.setGlobalPrefix(globalPrefix);

    // Enable json and cors to support body in global middlewares
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ extended: true, limit: '50mb', parameterLimit: 999 }));
    app.enableCors({
      origin: 'http://localhost:4200',
      credentials: true,
      methods: 'GET, OPTIONS, POST, PUT, PATCH',
      allowedHeaders:
        'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With',
    });

  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 3000;

   // Attach docs route
  //  await setupDocs(app);

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
