import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { HydratedDocument, Document } from 'mongoose';
import { Comments, CommentsSchema } from 'src/comments/comments.schema';

const options: SchemaOptions = {
  //스키마 옵션 설정

  timestamps: true, //db에 행해지는 동작들의 시간을 찍어줌
};
//db테이블모델
@Schema(options) //스키마 데코레이터를 사옹해서 스키마를 정의한다.
// mongoose의 Document를 상속받은 Cat 클래스
export class Cat extends Document {
  @ApiProperty({
    example: 'abc@naver.com',
    description: 'email',
    required: true,
  })
  @Prop({
    required: true, //필드속성 notnull
    unique: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'rory',
    description: 'name',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '123290dfdfgd!@',
    description: 'password',
    required: true,
  })
  @Prop({
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Prop({
    default:
      ' https://raw.githubusercontent.com/amamov/teaching-nestjs-a-to-z/main/images/1.jpeg',
  })
  @ApiProperty({
    example: 'httt://url.com/picture/list/car.jpg',
    description: 'image',
    required: false,
  })
  @IsString()
  imgUrl: string;

  @Prop({})
  @ApiProperty({
    example: 'key',
    description: 'key',
    required: false,
  })
  @IsString()
  key: string;

  readonly readOnlyData: {
    id: string;
    email: string;
    name: string;
    imgUrl: string;
    comments: Comments[];
    key: string;
  };

  readonly comments: Comments[];
}

const _CatSchema = SchemaFactory.createForClass(Cat); //클래스를 스키마로 만든다.

_CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
    imgUrl: this.imgUrl,
    comments: this.comments,
    key: this.key,
  };
});
// 연결후 담을곳 이름 작명가능
_CatSchema.virtual('commentList', {
  ref: 'comments', // 연결할 스키마의 COLLECTION 명
  localField: '_id', // 현재 스키마의 연결할 필드명
  foreignField: 'author', // 연결할 스키마의 연결할 필드명
});
//populate 사용을 위한 설정  다른 document 와 열결할때 변환이 가능한지 설정
_CatSchema.set('toObject', { virtuals: true });
_CatSchema.set('toJSON', { virtuals: true });

export const CatSchema = _CatSchema;
