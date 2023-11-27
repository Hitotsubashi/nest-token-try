import {
  Injectable,
  ExecutionContext,
  CallHandler,
  NestInterceptor,
  ForbiddenException,
} from '@nestjs/common';
import { TokenService } from './token.service';
import { Request, Response } from 'express';

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest<Request>();
    const cookies = request.cookies;
    if (!cookies['token']) {
      throw new ForbiddenException('No token provided');
    }
    if (!this.tokenService.verifyToken(cookies['token'])) {
      throw new ForbiddenException('Invalid token');
    }
    const token = this.tokenService.refreshToken(cookies['token']);
    const response = context.switchToHttp().getResponse<Response>();
    response.cookie('tokenExpiredTime', token.expired);
    return next.handle();
  }
}
