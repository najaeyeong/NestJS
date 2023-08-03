import {
  BadRequestException,
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
  UseFilters,
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
import { AWSService } from 'src/aws/aws.service';
import { CommentsRepository } from 'src/comments/comments.repository';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import multer from 'multer';
import { CatsRepository } from './cats.repository';
import { time } from 'console';

@Controller('cats')
@UseFilters(HttpExceptionFilter) //예외처리 필터 적용
@UseInterceptors(SuccessInterceptor)
export class CatsController {
  constructor(
    private readonly awsService: AWSService,
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
    private readonly commentsRepository: CommentsRepository,
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
  //@UseInterceptors(FilesInterceptor('images', 1, multerOptions('catImg'))) //fieldName, maxCount, localOptions   (multer를 사용해 로컬에 파일저장)
  // 해당 경로 rounter에 파일 추출 인터셉터 연결 @UploadedFile() 데코레이터를 사용해 추출한 파일을 전달
  @UseInterceptors(FileInterceptor('images')) //파일 추출하고 바로 반환해줌
  @Post('upload')
  async uploadImage(
    @UploadedFile() files: Express.Multer.File,
    @CurrentUser() cat: Cat, // 가드에서 인증 후 반환해준 req를 CurrentUser 데코레이터가 잡아서 request.user 정보만 반환해준 값
  ) {
    console.log(cat);
    try {
      console.log(files);
      if (files.mimetype === 'image/png' || files.mimetype === 'image/jpeg') {
        const originKey = cat.key;
        const result = await this.awsService.deleteS3Object(originKey);
        console.log(originKey, result);
        const keyObject = await this.awsService.uploadFileToS3('catImg', files);
        const key = keyObject.key;
        const imgUrl = this.awsService.getAwsS3FileUrl(key);
        return this.catsService.uploadImg(cat, imgUrl, key);
      } else {
        throw new BadRequestException('File type not good');
      }
    } catch (error) {
      throw new BadRequestException(`${error}`);
    }
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

  @Post('test')
  async separateTime(
    @Body()
    body: {
      근무시간: { 출근시간: string; 퇴근시간: string };
      휴식시간목록: { 시작시간: string; 종료시간: string }[];
    },
  ) {
    return this.catsService.separateTime(body.근무시간, body.휴식시간목록);
  }

  @Post('test2')
  async getKindOfWorkTimeList(
    @Body()
    body: {
      시작시간: string;
      종료시간: string;
      일일소정근로시간: number;
    },
  ) {
    const { 시작시간, 종료시간, 일일소정근로시간 } = body;
    return this.catsService.getKindOfWorkTimeList(
      시작시간,
      종료시간,
      일일소정근로시간,
    );
  }

  @Post('test3')
  async getTotalDayWorkTimeList(
    @Body()
    body: {
      근무시간: { 출근시간: string; 퇴근시간: string };
      휴식시간목록: { 시작시간: string; 종료시간: string }[];
    },
  ) {
    console.log(body.근무시간, body.휴식시간목록);
    return this.catsService.getTotalDayWorkTimeList(
      body.근무시간,
      body.휴식시간목록,
    );
  }
}

//test
// {
//   "근무시간":{"출근시간":"2023-07-13T08:00:00.000Z","퇴근시간":"2023-07-13T18:00:00.000Z"},
//   "휴식시간목록":[{"시작시간":"2023-07-13T12:00:00.000Z","종료시간":"2023-07-13T13:00:00.000Z"},{"시작시간":"2023-07-13T14:00:00.000Z","종료시간":"2023-07-13T14:30:00.000Z"},{"시작시간":"2023-07-13T16:30:00.000Z","종료시간":"2023-07-13T17:00:00.000Z"}]
// }

//test2
// {
//   "시작시간":"2023-07-13T05:00:00.000Z","종료시간":"2023-07-13T23:00:00.000Z","일일소정근로시간":6
// }

//test3
