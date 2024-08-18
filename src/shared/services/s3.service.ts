import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandOutput,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Injectable } from "@nestjs/common";

@Injectable()
export class S3BucketService {
  private s3Client: S3Client;
  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
    });
  }

  public async putObject(
    Key: string,
    ContentType: string,
    Body: any,
    ContentDisposition?: string
  ): Promise<PutObjectCommandOutput> {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key,
      ContentType,
      Body,
      ContentDisposition,
    });

    const response = await this.s3Client.send(command);

    return response;
  }

  public async getPreSignedURL(
    Key: string,
    ResponseContentType: string
  ): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key,
        ResponseContentType,
      });
      const url = await getSignedUrl(this.s3Client, command, {
        expiresIn: 86400 * 7,
      });
      return url;
    } catch (e) {
      return Key;
    }
  }

  public async putPreSignedURL(
    Key: string,
    ContentType: string
  ): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key,
      ContentType,
    });

    const url = await getSignedUrl(this.s3Client, command, {
      expiresIn: 86400,
    });

    return url;
  }

  public async deleteObject(Key: string): Promise<any> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key,
      });

      const response = await this.s3Client.send(command);

      return response;
    } catch (e) {
      console.log(e);
    }
  }
}
