import * as path from 'path';
import * as AWS from 'aws-sdk';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PromiseResult } from 'aws-sdk/lib/request';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';

@Injectable()
export class AWSService {
  private readonly awsS3: AWS.S3;
  public readonly S3_BUCKET_NAME: string;

  // AwsService 클래스 생성자  asw의 s3 객체를 받아서 만들어짐
  constructor(private readonly configService: ConfigService) {
    this.awsS3 = new AWS.S3({
      accessKeyId: this.configService.get('AWS_ACCESS_KEY'), //process.env.AWS_ACCESS_KEY
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get('AWS_S3_REGION'),
    });
    this.S3_BUCKET_NAME = this.configService.get('AWS_S3_BUCKET_NAME');
  }

  //S3에 파일 업로드
  async uploadFileToS3(
    folder: string, //저장될 폴더명
    file: Express.Multer.File, //저장할 파일 //
  ): Promise<{
    key: string;
    s3Object: PromiseResult<AWS.S3.PutObjectOutput, AWS.AWSError>;
    contentType: string;
  }> {
    try {
      const key = `${folder}/${Date.now()}_${path.basename(
        file.originalname,
      )}`.replace(/ /g, ''); //파일의 유니크한 이름 생성

      const s3Object = await this.awsS3 // S3 객체 보내는 형식을 putObject로 설정하고 promise타입으로 받기위해 .promise()
        .putObject({
          Bucket: this.S3_BUCKET_NAME,
          Key: key,
          Body: file.buffer,
          ACL: 'public-read',
          ContentType: file.mimetype,
        })
        .promise(); //upload 한거임
      return { key, s3Object, contentType: file.mimetype }; // 어디에 저장한건지 반환해줌 이걸로 database에 경로(key) 저장
    } catch (error) {
      throw new BadRequestException(`File upload failed : ${error}`);
    }
  }

  //s3에서 파일 삭제
  async deleteS3Object(
    key: string, //저장되있는 이름
    callback?: (err: AWS.AWSError, data: AWS.S3.DeleteObjectOutput) => void,
  ): Promise<{ success: boolean }> {
    try {
      await this.awsS3.deleteObject(
        {
          Bucket: this.S3_BUCKET_NAME,
          Key: key,
        },
        callback,
      );
      return { success: true };
    } catch (error) {
      throw new BadRequestException(`Failed to delete file : ${error}`);
    }
  }

  //objectKey - 파일의 위치를 알려주는 key  , 전체 URL 정보 반환
  public getAwsS3FileUrl(objectKey: string) {
    return `https://${this.S3_BUCKET_NAME}.s3.amazonaws.com/${objectKey}`;
  }
}
