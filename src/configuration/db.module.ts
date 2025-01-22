// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { ConfigModule } from '@nestjs/config';
// import { AppConfig } from './app.config';

// @Module({
//     imports: [
//         ConfigModule.forRoot({ isGlobal: true }),
//         MongooseModule.forRootAsync({
//             useFactory: () => ({
//                 uri: AppConfig.mongoUri,
//             }),
//         }),
//     ],
//     exports: [MongooseModule],
// })
// export class DBModule { }
