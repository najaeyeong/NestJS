import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CommentsCreateDto } from '../dto/comments.create.dto';
import { CommentsService } from '../services/comments.service';
import { Types } from 'mongoose';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({
    summary: '프로필의 모든 댓글 가져오기',
  })
  @Get()
  async getAllComments() {
    return await this.commentsService.getAllComments();
  }

  @ApiOperation({ summary: '프로필에 댓글 남기기' })
  @Post(':id')
  async createComment(
    @Param('id') id: string,
    @Body() body: CommentsCreateDto,
  ) {
    return await this.commentsService.createComment(id, body);
  }

  @ApiOperation({ summary: '댓글 좋아요 수 올리기' })
  @Patch(':id')
  async plusLike(@Param('id') id: string | Types.ObjectId) {
    return await this.commentsService.plusLike(id);
  }
}
