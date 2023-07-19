import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CommentsController } from './comments/controllers/comments.controller';
import { CommentsService } from './comments/services/comments.service';
import { CommentsModule } from './comments/comments.module';
import { AWSModule } from './aws/aws.module';

import mongoose from 'mongoose';

//controllers에 providers와 imports를 연결,공급
@Module({
  imports: [
    // config 전역 사용
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConfigModule.forRoot(), //환경변수사용 .env
    MongooseModule.forRoot(process.env.MONGODB_URI), //mongoDB 연결
    CatsModule,
    AuthModule,
    CommentsModule,
    AWSModule,
  ], //모든 모듈이 app.module로 모이게 된다.
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false; //개발모드 true false
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
    mongoose.set('debug', this.isDev); //개발모드라면 mongoose query 로그로 남김
  }
}
