import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, } from '@aws-sdk/client-s3';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class BucketService { 
  private s3: S3;
  constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService
  ) {
    this.s3 = new S3({
      credentials: {
        accessKeyId: this.config.get<string>('aws_key'),
        secretAccessKey: this.config.get<string>('aws_secret_key')
      }
    })
  }

  async uploadFile(file: Express.Multer.File) {

    //@ts-ignore
    const data = Buffer.from(file.buffer, 'binary');

    const result = await this.s3.upload({
      Bucket: this.config.get<string>('aws_bucket'),
      Key: `${uuid()}-${file.originalname}`,
      Body: data,
      ContentType: file.mimetype
    }).promise();

    return {
      key: result.Key,
      location: result.Location
    }
  }

  async getSignedURL(bucket: string, fileName: string, expiry: number) {
    return this.s3.getSignedUrl('getObject', {
      Bucket: bucket,
      Key: fileName,
      Expires: expiry * 60 *15
    })
  }
}
