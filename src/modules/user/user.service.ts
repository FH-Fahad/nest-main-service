import { Inject, Injectable, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { firstValueFrom } from 'rxjs';
import { User, UserDocument } from './entity/user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>,
        @Inject('MAIN_SERVICE')
        private readonly client: ClientProxy,
    ) { }


    async getUsers(): Promise<any> {
        return await this.userModel.find().sort({ createdAt: -1 }).exec();
    }

    async createUser(body: UserDto): Promise<any> {
        console.log('Sending message to RabbitMQ:', body);

        const result = await firstValueFrom(
            this.client.send({ cmd: 'create_user' }, { ...body })
        );

        console.log('Response from microservice:', result);

        const { email, password } = result;

        const user = await this.userModel.create({ email, password });

        return user;
    }
    // async createUser(req): Promise<any> {
    //     const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    //     const os = req.headers['user-agent'];
    //     console.log('IP:', ip, '\nOS:', os);

    //     return { ip, os };
    // }
}
