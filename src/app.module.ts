import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { PGModule } from './configuration/pg.module';

@Module({
  imports: [
    //DBModule,
    //RMQModule,
    PGModule,
    UserModule,
  ],
})
export class AppModule { }
