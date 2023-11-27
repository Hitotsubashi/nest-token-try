import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoginController } from './login.controller';
import { WikiController } from './wiki.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import LoggerMiddleware from './log.middleware';
import { TokenService } from './token.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
  ],
  controllers: [LoginController, WikiController],
  providers: [Logger, TokenService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
