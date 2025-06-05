import { Controller, Get, Query, Post, Delete,Param } from '@nestjs/common';
import { GcsService } from './gcs.service';
@Controller('gcs')
export class GcsController {
  constructor(private readonly gcsService: GcsService) {}

@Post('signed-url')
    getSignedUrl(@Query('fileName') fileName: string) {
        console.log('🔵 GCS SIGNED URL:', fileName);
        return this.gcsService.generateSignedUrl(fileName);
    }
  
  @Get('image-files')
  async getIMG() {
    const urls = await this.gcsService.imgBucket();
    return { count: urls[0].length, images: urls[0] , filedetails: urls[1] };
  }

  @Delete('delete-file/:fileName')
  async deleteFile(@Param('fileName') fileName: string) {
    return this.gcsService.deleteFile(fileName);
  }

//   @Post('upload')
//   upload() {
//     return this.gcsService.uploadTestJson();
//   }

//   @Delete('delete')
//   delete() {
//     return this.gcsService.deleteTestJson();
//   }
  
}
