import { Injectable, NestMiddleware } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export default class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, params, path } = req;
    this.logger.log(`${method}:${path}${params[0]}`, 'route');
    next();
  }
}
