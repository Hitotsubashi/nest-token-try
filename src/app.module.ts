import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { AppService } from './app.service';
import { WikiController } from './wiki.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
  ],
  controllers: [LoginController, WikiController],
  providers: [AppService],
})
export class AppModule {}
