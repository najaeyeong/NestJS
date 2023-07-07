import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//AuthGuard 는 Strategy를 자동으로 실행시켜줌
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
