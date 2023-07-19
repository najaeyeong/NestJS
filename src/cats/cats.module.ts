import { Module, forwardRef } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './cats.schema';
import { CatsRepository } from './cats.repository';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '@nestjs/config';
import { CommentsSchema, Comments } from 'src/comments/comments.schema';
import { AWSModule } from 'src/aws/aws.module';
import { CommentsModule } from 'src/comments/comments.module';
import { memoryStorage } from 'multer';

//controllers에 providers와 imports를 연결,공급
//exports 된 것은 다른곳에서 import로 받아서 사용가능
@Module({
  imports: [
    AWSModule,
    ConfigModule.forRoot(), //환경변수사용 .env
    //로컬에 폴더를 만들어서 파일을 저장할때 사용   disk 폴더에 upload 폴더생기면서 저장된다.
    // MulterModule.register({
    //   dest: './upload',
    //   //storage: memoryStorage, //buffer로 저장 , 표현됨
    // }), // 파일업로드 Multer 모듈 등록
    MongooseModule.forFeature([
      { name: Cat.name, schema: CatSchema },
      { name: Comments.name, schema: CommentsSchema },
    ]), //db스키마 등록
    forwardRef(() => AuthModule), //인증 모듈 등록
    forwardRef(() => AWSModule),
    forwardRef(() => CommentsModule),
  ],
  controllers: [CatsController],
  providers: [CatsService, CatsRepository],
  exports: [CatsService, CatsRepository], // 은닉화 되어있던 서비스를 퍼블릭으로 품 app.models에서 사용가능
})
export class CatsModule {}
