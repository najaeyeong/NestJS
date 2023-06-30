import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { HydratedDocument, Document } from 'mongoose';

const options: SchemaOptions = {
  //스키마 옵션 설정
  timestamps: true, //db에 행해지는 동작들의 시간을 찍어줌
};

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
  @Prop()
  @IsString()
  imgUrl: string;

  readonly readOnlyData: { id: string; email: string; name: string };
  readonly read1: { id: string };
}

export const CatSchema = SchemaFactory.createForClass(Cat); //클래스를 스키마로 만든다.

CatSchema.virtual('readOnlyData').get(function (this: Cat) {
  return {
    id: this.id,
    email: this.email,
    name: this.name,
  };
});
CatSchema.virtual('read1').get(function (this: Cat) {
  return {
    id: this.id,
  };
});
