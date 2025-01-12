import { Module } from '@nestjs/common';
import { DBModule } from './configuration/db.module';
import { UserModule } from './modules/user/user.module';
import { RMQModule } from './configuration/rmq.module';

@Module({
  imports: [
    DBModule,
    RMQModule,
    UserModule,
  ],
})
export class AppModule { }
