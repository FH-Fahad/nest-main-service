import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(`${process.env.MONGOURI}`),

    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'RABBITMQ_CLIENT',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://guest:guest@localhost:5672'], // RabbitMQ connection URL
            queue: 'user_queue', // The same queue as the microservice
            queueOptions: {
              durable: true,
            },
          },
        });
      },
    },
  ],
  // exports: ['RABBITMQ_CLIENT'],
})
export class AppModule { }
