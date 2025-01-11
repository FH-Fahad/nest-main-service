import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { ClientProxy } from '@nestjs/microservices';
import { Dto } from './dto';
import { first, firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    @Inject('MAIN_SERVICE')
    private readonly client: ClientProxy,
  ) { }


  async getUsers(): Promise<any> {
    return await this.userModel.find().sort({ createdAt: -1 }).exec();
  }

  async createUser(body: Dto): Promise<any> {
    console.log('Sending message to RabbitMQ:', body);

    const result = await firstValueFrom(
      this.client.send({ cmd: 'create_user' }, { ...body })
    );

    console.log('Response from microservice:', result);

    const { email, password } = result;
    const user = await this.userModel.create({ email, password });

    return user;
  }
}
