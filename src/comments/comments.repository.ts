import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comments } from './comments.schema';

// db와 연결해서 원하는 데이터들을 갖어오는 함수들
@Injectable()
export class CommentsRepository {
  constructor(
    @InjectModel(Comments.name) private readonly commentsModel: Model<Comments>,
  ) {} // db 모델 직접 연결해서 사용
  async findAll(): Promise<Comments[] | null> {
    const comments = await this.commentsModel.find();
    return comments;
  }

  async create(
    id: string | Types.ObjectId,
    author: string | Types.ObjectId,
    contents: string,
  ) {
    const newCommnet = new this.commentsModel({
      author: author,
      contents: contents,
      info: id,
    });
    return await newCommnet.save();
  }

  async getLikeCount(id: string | Types.ObjectId) {
    const comment = await this.commentsModel.findById(id);
    return comment.likeCount;
  }

  async updateLikeCount(id: string | Types.ObjectId, count: number) {
    const comment = await this.commentsModel.findById(id);
    comment.likeCount = count;
    return await comment.save();
  }
}
