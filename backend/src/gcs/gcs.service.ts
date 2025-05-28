import { Injectable,InternalServerErrorException } from '@nestjs/common';
import { Storage,GetSignedUrlConfig } from '@google-cloud/storage';
import * as path from 'path';

@Injectable()
export class GcsService {
  private storage = new Storage({
    keyFilename: path.join(__dirname, '../../myorder-beta-eb5bdd1ce30b.json'),
  });
  
  private bucketName = 'beta-istamp'; // ชื่อ bucket 
    
  async generateSignedUrl(fileName: string): Promise<{ uploadUrl: string }> {
    try {
      const options = {
        version: 'v4' as 'v4',
        action: 'write' as 'write',
        expires: Date.now() + 15 * 60 * 1000,
      };

      const signedUrls = await this.storage
        .bucket(this.bucketName)
        .file(fileName)
        .getSignedUrl(options);

      console.log(signedUrls)

      return { uploadUrl: signedUrls[0] };
    } catch (error) {
      console.error('🔴 GCS SIGNED URL ERROR:', error.message);
      console.error(error.stack); // <== สำคัญ
      throw new InternalServerErrorException('Failed to generate signed URL');
    }
  }

  async deleteFile(fileName: string): Promise<void> {
    try {
      await this.storage.bucket(this.bucketName).file('%E0%B8%88%E0%B8%B1%E0%B8%81%E0%B8%A3%E0%B8%A2%E0%B8%B2%E0%B8%99%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B8%AD%E0%B8%AB%E0%B8%A1%E0%B8%AD%E0%B8%9A.jpg').delete();

    } catch (error) {
      console.error('🔴 GCS DELETE FILE ERROR:', error.message);
      throw new InternalServerErrorException('Failed to delete file');
    }
  }

  async imgBucket(): Promise<any> {
    const [files] = await this.storage.bucket(this.bucketName).getFiles();
    // const imageFiles = files
    const imageFiles = files.filter(file =>
      /\.(jpg|jpeg|png|webp)$/i.test(file.name)
    );

    const signedUrls = await Promise.all(
      imageFiles.map(file =>
        file.getSignedUrl({
          action: 'read',
          expires: Date.now() + 15 * 60 * 1000, 
        }).then(res => res[0])
      )
    );

    return signedUrls
  }
//   async uploadTestJson() {
//     const bucket = this.storage.bucket(this.bucketName);
//     const file = bucket.file('your-json-file.json');
//     const content = JSON.stringify({ message: 'Hello from NestJS GCS!' });

//     await file.save(content, {
//       contentType: 'application/json',
//     });

//     return  { message: 'File uploaded' };
//   }

//   async deleteTestJson() {
//     const bucket = this.storage.bucket(this.bucketName);
//     const file = bucket.file('your-json-file.json');
    
//     await file.delete();
//     return  { message: 'File deleted' };
//   }
}
