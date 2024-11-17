import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getUsers() {
    return this.appService.getUsers();
  }

  @Post()
  createUser(@Body() body) {
    return this.appService.createUser(body);
  }
}
