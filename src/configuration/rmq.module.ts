import { Module } from '@nestjs/common';
import { AppConfig } from './app.config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
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
    exports: [ClientsModule],
})
export class RMQModule { }
