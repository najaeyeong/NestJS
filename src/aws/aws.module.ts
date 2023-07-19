import { Module, forwardRef } from '@nestjs/common';
import { AWSService } from './aws.service';
import { ConfigModule } from '@nestjs/config';
import { CatsController } from 'src/cats/cats.controller';
import { CatsModule } from 'src/cats/cats.module';
import { AuthModule } from 'src/auth/auth.module';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    forwardRef(() => CatsModule),
    forwardRef(() => AuthModule),
    forwardRef(() => CommentsModule),
  ], //환경변수사용 .env,
  controllers: [CatsController],
  providers: [AWSService],
  exports: [AWSService],
})
export class AWSModule {}
