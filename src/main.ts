import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder() // api문서 만들기 swagger
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); //swagger api의 endpoint를 지정해주는것
  app.useGlobalPipes(new ValidationPipe()); //CLASS VALIDATION 사용 시 등록해줘야함
  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors({
    // cors 설정
    origin: true, //개발한 fronend url   true시 모든 url에서 api를 사용할수 있게 된다.
    credentials: true,
  });

  const PORT = process.env.PORT;
  await app.listen(PORT);
}
bootstrap();
