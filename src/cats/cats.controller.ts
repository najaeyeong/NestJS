import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatRequestDto } from './dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CatResponseDto } from './dto/cats.response.dto';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}
  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  @ApiResponse({ status: 500, description: '서버에러' })
  @ApiResponse({ status: 200, description: '성공', type: CatResponseDto })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    //console.log(body);
    return this.catsService.signUp(body);
  }
  @Post('login')
  login() {
    return 'login';
  }
  @Post('logout')
  logout() {
    return 'logout';
  }
  @Post('upload/cats')
  uploadImage() {
    return 'upload image';
  }
}
