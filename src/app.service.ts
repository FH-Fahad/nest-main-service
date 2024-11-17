import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) { }


  async getUsers(): Promise<any> {
    return await this.userModel.find().exec();
  }

  async createUser(body): Promise<any> {
    const { email, password } = body;
    const user = await this.userModel.create({ email, password });

    return user;
  }
}
