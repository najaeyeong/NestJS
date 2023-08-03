import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { CatsController } from 'src/cats2/cats.controller';
import { CatsRepository } from 'src/cats2/cats.repository';
import { CatsModule } from 'src/cats2/cats.module';
import { ConfigModule } from '@nestjs/config';
import { AWSModule } from 'src/aws/aws.module';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot(), //환경변수사용 .env
    //인증설정,기본정략,sesstion스토리지 사용여부
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    //로그인설정
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1y' },
    }),
    //CatModule이 export 하는 것들을 갖어온다.
    forwardRef(() => CatsModule),
    forwardRef(() => AWSModule),
    forwardRef(() => CommentsModule),
  ],
  controllers: [],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
