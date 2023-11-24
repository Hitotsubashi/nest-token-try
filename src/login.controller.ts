import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class LoginController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  login(@Body() body: { username: string; password: string }) {
    return {
      token: `username=${body.username}&&password=${body.password}`,
    };
  }

  @Get('logout')
  logout() {
    return {};
  }
}
