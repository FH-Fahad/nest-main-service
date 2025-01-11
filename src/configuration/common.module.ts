import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppConfig } from './app.config';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRootAsync({
            useFactory: () => ({
                uri: AppConfig.mongoUri,
            }),
        }),
        ClientsModule.register([
            {
                name: 'MAIN_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: [AppConfig.rabbitMQUri],
                    queue: `${AppConfig.env}_main_queue`,
                    queueOptions: {
                        durable: true,
                    },
                },
            },
        ]),
    ],
    exports: [MongooseModule, ClientsModule],
})
export class CommonModule { }
