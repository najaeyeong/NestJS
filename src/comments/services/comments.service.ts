import { BadRequestException, Injectable } from '@nestjs/common';
import { CommentsRepository } from '../comments.repository';
import { CommentsCreateDto } from '../dto/comments.create.dto';
import { Types } from 'mongoose';
import { CatsRepository } from 'src/cats/cats.repository';

@Injectable()
export class CommentsService {
  constructor(
    private readonly commentsRepository: CommentsRepository,
    private readonly catsRepository: CatsRepository,
  ) {}

  async getAllComments() {
    try {
      return await this.commentsRepository.findAll();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createComment(id: string, body: CommentsCreateDto) {
    try {
      const { author, contents } = body;
      // 조작된 id 정보가 들어왔을 가능성이 있으므로 아래와 같이 find를 통해 있는지 확인해준다.
      const targetCat = await this.catsRepository.findCatByIdWithdoutPassword(
        id,
      );
      const authorCat = await this.catsRepository.findCatByIdWithdoutPassword(
        author,
      );
      return await this.commentsRepository.create(
        targetCat.id,
        authorCat.id,
        contents,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async plusLike(id: string | Types.ObjectId) {
    try {
      const likeCount = await this.commentsRepository.getLikeCount(id);
      return await this.commentsRepository.updateLikeCount(id, likeCount + 1);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
