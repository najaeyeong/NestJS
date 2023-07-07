import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Document, Types } from 'mongoose';

const options: SchemaOptions = {
  //스키마 옵션 설정
  collection: 'comments',
  timestamps: true, //db에 행해지는 동작들의 시간을 찍어줌
};
//db테이블모델
@Schema(options) //스키마 데코레이터를 사옹해서 스키마를 정의한다.
// mongoose의 Document를 상속받은 Comments 클래스
export class Comments extends Document {
  @ApiProperty({
    example: 'asdf98798sd8f92fsdnf4389',
    description: '댓글 작성자',
    required: true,
  })
  @Prop({
    type: Types.ObjectId, // mongoDB ID TYPE
    required: true, //필드속성 notnull
    // 참조할 schema (ref = join 개념) ,SchemaOptions의 collection 또는 schema의 첫문자를 소문자로 바꿔서 적어준다.
    ref: 'cat',
    unique: false,
  })
  @IsNotEmpty()
  author: string | Types.ObjectId;

  @ApiProperty({
    example: '안녕하세요. 좋은하루 보내세요!',
    description: '댓글 내용',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  contents: string;

  @ApiProperty({
    example: 1234,
    description: '좋아요 갯수',
    required: true,
  })
  @Prop({
    default: 0,
    required: true,
  })
  @IsPositive() //양수
  @IsNotEmpty()
  likeCount: number;

  @ApiProperty({
    example: 'asdf98798sd8f92fsdnf4389',
    description: '댓글이 남겨질 프로필 또는 댓글',
    required: true,
  })
  @Prop({
    type: Types.ObjectId, // mongoDB ID TYPE
    required: true, //필드속성 notnull
    ref: 'cat',
    unique: false,
  })
  @IsNotEmpty()
  info: string | Types.ObjectId;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments); //클래스를 스키마로 만든다.
