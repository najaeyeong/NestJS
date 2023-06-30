import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  Param,
  Redirect,
  Req,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { SuccessInterceptor } from './common/interceptors/success.interceptor';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class AppController {
  constructor(private readonly appService: AppService) {}
  //@데코레이터 문법 reflect-metadata 사용
  //http://localhost:3000/cats/hello/id/name
  @Get('hello/:id/:name')
  // @HttpCode(200)
  // @Headers()
  // @Redirect('')
  @UseFilters(HttpExceptionFilter) //예외처리 필터 적용
  getHello(
    @Req() req: Request,
    @Body() Body,
    @Param() param: { id: string; name: string },
  ): string {
    throw new HttpException('error message', 404); //http 관련 에러 관리
    return this.appService.getHello();
  }
}
