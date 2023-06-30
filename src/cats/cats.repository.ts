import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './cats.schema';
import { Model } from 'mongoose';

@Injectable()
export class CatsRepository {
  constructor(@InjectModel(Cat.name) private catModel: Model<Cat>) {} // db 모델 직접 연결해서 사용

  //존재하면 id 반환 , 없으면 null
  async existsByEmail(_email: string): Promise<{ _id: any }> {
    try {
      const result = await this.catModel.exists({ emai: _email });
      return result;
    } catch (error) {
      throw new HttpException('db error', 400);
    }
  }

  async create(cat: CatRequestDto): Promise<Cat> {
    return await this.catModel.create(cat);
  }
}
