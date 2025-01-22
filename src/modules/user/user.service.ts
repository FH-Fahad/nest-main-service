import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }


    async getUsers(): Promise<any> {
        return await this.userRepository.find();
    }


    async createUser(body: UserDto): Promise<any> {
        const user = this.userRepository.create(body);

        return await this.userRepository.save(user);
    }
}
