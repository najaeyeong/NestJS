import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PayloadType } from './jwt.payload';
import { CatsRepository } from 'src/cats2/cats.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly catsRepository: CatsRepository) {
    super({
      //JWT에 대한 설정
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
      ignoreExpiration: false, // Expiration 만료기간
    });
  }

  //Strategy는 아래 함수를 바로 실행해준다.
  //payload 유효성검사
  async validate(payload: PayloadType) {
    const cat = await this.catsRepository.findCatByIdWithdoutPassword(
      payload.sub,
    );
    if (cat) {
      return cat; // request.user(토큰안에들어있던 정보) 안에 cat(db에서 찾아온 정보) 이 들어간 형태로 반환
    } else {
      throw new UnauthorizedException('접근 오류');
    }
  }
}
