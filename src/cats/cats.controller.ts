import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatRequestDto } from './dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CatResponseDto } from './dto/cats.response.dto';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { LoginResponseDto } from 'src/auth/dto/login.response.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/utils/multer.options';
import { CurrentUser } from 'src/common/decordators/user.decorator';
import { Cat } from './cats.schema';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '현재 유저 정보 갖어오기' })
  @ApiResponse({ status: 200, description: '성공', type: CatResponseDto })
  @UseGuards(JwtAuthGuard) // 가드  인증처리 먼저
  @Get()
  getCurrentCat(@CurrentUser() cat) {
    //(@Req() req: any)
    //req => 가드가 인증처리한후 반환한 정복값이다.  req.user로 데이터가 들어온다.
    return cat;
  }

  @ApiResponse({ status: 500, description: '서버에러' })
  @ApiResponse({ status: 200, description: '성공', type: CatResponseDto })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    //console.log(body);
    return this.catsService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @ApiResponse({
    status: 200,
    description: '로그인성공',
    type: LoginResponseDto,
  })
  @Post('login')
  login(@Body() body: LoginRequestDto) {
    return this.authService.JwtLogIn(body);
  }

  @ApiOperation({ summary: '이미지 업로드' })
  @ApiResponse({
    status: 200,
    description: '업로드 성공',
    type: CatResponseDto,
  })
  @UseGuards(JwtAuthGuard) // 가드  인증처리 먼저
  @UseInterceptors(FilesInterceptor('files', 10, multerOptions('cats'))) //fieldName, maxCount, localOptions
  // 해당 경로 rounter에 파일 추출 인터셉터 연결 @UploadedFile() 데코레이터를 사용해 추출한 파일을 전달
  @Post('upload')
  uploadImage(
    @UploadedFiles() files: Express.Multer.File,
    @CurrentUser() cat: Cat, // 가드에서 인증 후 반환해준 req를 CurrentUser 데코레이터가 잡아서 request.user 정보만 반환해준 값
  ) {
    return this.catsService.uploadImg(cat, files);
  }

  @ApiOperation({ summary: '고양지 전체 갖어오기' })
  @ApiResponse({
    status: 200,
    description: '업로드 성공',
    type: CatResponseDto,
    isArray: true,
  })
  @Get('all')
  async getAllCats() {
    return this.catsService.getAllCats();
  }
}
