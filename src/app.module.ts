import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import mongoose from 'mongoose';
@Module({
  imports: [
    CatsModule,
    ConfigModule.forRoot(), //환경변수사용 .env
    MongooseModule.forRoot(process.env.MONGODB_URI), //mongoDB 연결
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
