import { PickType } from '@nestjs/swagger';
import { Comments } from '../comments.schema';
//PickType(스키마,[필드]) - 선택한것만 상송
export class CommentsCreateDto extends PickType(Comments, [
  'author',
  'contents',
] as const) {}
