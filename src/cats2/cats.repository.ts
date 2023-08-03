import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from './cats.schema';
import mongoose, { Model, Types } from 'mongoose';
import { CatRequestDto } from './dto/cats.request.dto';
import { CatResponseDto } from './dto/cats.response.dto';
import { CommentsSchema, Comments } from 'src/comments/comments.schema';

// db와 연결해서 원하는 데이터들을 갖어오는 함수들
@Injectable()
export class CatsRepository {
  constructor(
    @InjectModel(Cat.name) private readonly catModel: Model<Cat>,
    @InjectModel(Comments.name) private readonly commentsModel: Model<Comments>,
  ) {} // db 모델 직접 연결해서 사용

  //존재하면 id 반환 , 없으면 null
  async existsByEmail(_email: string) {
    try {
      const result = await this.catModel.exists({ emai: _email });
      return result;
    } catch (error) {
      throw new HttpException('db error', 400);
    }
  }

  async findCatByEmail(email: string) {
    const cat = await this.catModel.findOne({ email });
    return cat;
  }

  async findCatByIdWithdoutPassword(id: string | Types.ObjectId) {
    //password  를 제외하고 정보를 갖어옴 or  .select('email name')
    const cat = await this.catModel.findById(id).select('-password');
    return cat.readOnlyData;
  }

  async create(cat: CatRequestDto) {
    return await this.catModel.create(cat);
  }

  async findByIdAndUpdateImg(
    id: string | Types.ObjectId,
    imgUrl: string,
    key: string,
  ) {
    const cat = await this.catModel.findById(id);
    cat.imgUrl = imgUrl;
    cat.key = key;
    // cat.imgUrl = `${process.env.URL}/media/${fileName}`;
    const newCat = await cat.save();

    return newCat.readOnlyData;
  }
  async findAll() {
    // const CommentsModel = mongoose.model(Comments.name, CommentsSchema);
    // const result = await this.catModel
    //   .find()
    //   .populate('comments', CommentsModel);
    // return result;
    const result = await this.catModel
      .find()
      .populate({ path: 'commentList', model: this.commentsModel });
    return result;
  }
}
