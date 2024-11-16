import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `This is a NestJS app! 🚀
    Running on port ${process.env.PORT}`;
  }
}
