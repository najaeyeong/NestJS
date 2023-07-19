import { Module, forwardRef } from '@nestjs/common';
import { CommentsController } from './controllers/comments.controller';
import { CommentsService } from './services/comments.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsSchema, Comments } from './comments.schema';

import { CommentsRepository } from './comments.repository';
import { CatsModule } from 'src/cats/cats.module';
import { AuthModule } from 'src/auth/auth.module';
import { AWSModule } from 'src/aws/aws.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comments.name, schema: CommentsSchema },
    ]), //db스키마 등록
    forwardRef(() => CatsModule),
    forwardRef(() => AuthModule),
    forwardRef(() => AWSModule),
  ],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository],
  exports: [CommentsRepository],
})
export class CommentsModule {}
