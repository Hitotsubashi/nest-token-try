import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { TokenService } from './token.service';
import { Request, Response } from 'express';

@Controller('api')
export class LoginController {
  constructor(private readonly tokenService: TokenService) {}

  @Post('login')
  login(
    @Body() body: { username: string; password: string },
    @Res() res: Response,
  ) {
    const token = this.tokenService.generateToken(body.username, body.password);
    res.cookie('token', token.content, {
      expires: new Date(Date.now() + 900000),
    });
    res.cookie('tokenExpiredTime', token.expired, {
      expires: new Date(Date.now() + 900000),
    });
    res.status(HttpStatus.OK).send();
  }

  @Get('logout')
  logout(@Req() request: Request, @Res() res: Response) {
    this.tokenService.removeToken(request.cookies['token']);
    res.clearCookie('token');
    res.clearCookie('tokenExpiredTime');
    res.status(HttpStatus.OK).send();
  }
}
