import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CatRequestDto } from './dto/cats.request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.schema';
import * as bcrypt from 'bcrypt';
import { CatsRepository } from './cats.repository';

@Injectable() //공급자
export class CatsService {
  //constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {} // db 모델 직접 연결해서 사용
  constructor(private readonly catsRepository: CatsRepository) {}
  async signUp(body: CatRequestDto) {
    const { email, name, password } = body;
    const id = await this.catsRepository.existsByEmail(email);

    if (id !== null) {
      throw new UnauthorizedException('해당 email은 이미 존재합니다.'); //예외처리
      //throw new HttpExceptionFilter(' 해당 email은 이미 존재합니다.', 403);  //같은것임
    }

    //암호화
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    //mongodb저장
    const cat = await this.catsRepository.create({
      email,
      name,
      password: hashedPassword,
    });
    //반환
    return cat.readOnlyData;
  }
}
