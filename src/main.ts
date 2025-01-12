import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfig } from './configuration/app.config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  const config = new DocumentBuilder()
    .setTitle('main service')
    .setDescription('Main Service API description')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('xyz', app, documentFactory);

  app.use(compression());
  await app.listen(AppConfig.port);

  console.log(`Server started port ${AppConfig.port} with ${AppConfig.env} environment`);
}

bootstrap();
