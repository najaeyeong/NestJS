import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatsRepository } from 'src/cats/cats.repository';
import { LoginRequestDto } from './dto/login.request.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  //   갖어와서 사용할려면 모듈에 등록해서 사용해야하는데  이때 provider에 등록해서 사용해도 되지만
  //   import에 모듈을 갖어와서 사용해도 된다. 갖어오는 모듈의 exports에 등록되어있는것들을 갖어올수있다.
  constructor(
    private readonly catsRepository: CatsRepository,
    //JwtModule에서 제공해줌
    private jwtService: JwtService,
  ) {}

  async JwtLogIn(data: LoginRequestDto) {
    const { email, password } = data;
    // 이메일존재하는지 확인
    const cat = await this.catsRepository.findCatByEmail(email);
    if (!cat) {
      throw new UnauthorizedException('이메일을 확인해주세요.');
    }
    //비밀번호가 맞는지 확인
    const isPasswordValidated: boolean = await bcrypt.compare(
      password,
      cat.password,
    );
    if (!isPasswordValidated) {
      throw new UnauthorizedException('비밀번호를 확인해주세요.');
    }

    //jwt만들기 , 발급
    const payload = { email: email, sub: cat.id };
    return { token: this.jwtService.sign(payload) };
  }
}
