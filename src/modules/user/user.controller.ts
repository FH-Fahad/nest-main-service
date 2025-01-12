import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    getUsers() {
        return this.userService.getUsers();
    }

    @Post()
    createUser(@Body() body: UserDto) {
        return this.userService.createUser(body);
    }

    // @Post()
    // createUser(@Req() req) {
    //     return this.userService.createUser(req);
    // }
}
