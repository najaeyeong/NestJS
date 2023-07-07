import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as expressBasicAuth from 'express-basic-auth';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //<NestExpressApplication>라고 제네릭을 달아주어야 .useStaticAssets 사용가능해진다.

  app.useGlobalPipes(new ValidationPipe()); //CLASS VALIDATION 사용 시 등록해줘야함
  app.useGlobalFilters(new HttpExceptionFilter());

  //파일경로관련 설정
  // src/public의 정적파일 사용 가능 serving 가능 해짐
  //app.useStaticAssets(path.join(__dirname, '..', 'src', 'public'));
  // common/uploads의 정적파일 사용 가능 serving 가능 해짐 url endpoint 를 /media로 하여 접근 가능하게 해줌
  app.useStaticAssets(path.join(__dirname, '..', './common', 'uploads'), {
    prefix: '/media',
  });
  // app.setBaseViewsDir(path.join(__dirname, '..', 'src', 'views')); //src/views의 ejs파일을 view로 사용함
  // app.setViewEngine("ejs");

  // api 보안 관련설정
  app.use(
    ['/api', '/api-json'],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );

  // api문서 만들기 swagger 설정
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); //swagger api의 endpoint를 지정해주는것

  //Cors 설정
  app.enableCors({
    origin: true, //개발한 fronend url   true시 모든 url에서 api를 사용할수 있게 된다.
    credentials: true,
  });

  const PORT = process.env.PORT;
  await app.listen(PORT);
}
bootstrap();
