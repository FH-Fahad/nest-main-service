import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  ClientProxyFactory.create({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@localhost:5672'], // RabbitMQ connection URL
      queue: 'user_queue', // The same queue as the microservice
      queueOptions: {
        durable: true,
      },
    },
  });

  // app.setGlobalPrefix('api');
  const port = process.env.PORT ?? 3001;
  await app.listen(port);

  console.log(`Server started on http://localhost:${port}`);
}
bootstrap();
