import { Controller, Get, Post, UploadedFiles, UploadedFile, UseInterceptors, Body, BadRequestException, Req, Res } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { FileInterceptor, FileFieldsInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express';
import type { Response } from 'express';
import { UploadResultDto } from './dto/upload-result.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('preview')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'files', maxCount: 10 }, // รองรับ file_image หลายไฟล์
  ]))
  async GetImagePreview(
    @UploadedFiles() files: { files?: Express.Multer.File[] },
    @Req() req: Request,
    @Res() res: Response,
  ) {
    if (!files || !files.files || files.files.length === 0) {
      throw new BadRequestException('No files provided');
    }

    // ดึงข้อมูล slot และ temp_url จาก req.body
    const body = req.body;
    if (!body) {
      throw new BadRequestException('Request body is missing');
    }
    const fileList = files.files;

    const groupedFiles: { slot: any; temp_url: any; file_image: Express.Multer.File }[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const slot = body[`files[${i}][slot]`];
      const temp_url = body[`files[${i}][temp_url]`];
      const file_image = fileList[i];

      if (!slot || !temp_url || !file_image) {
        throw new BadRequestException(`Missing data for file index ${i}`);
      }

      groupedFiles.push({ slot, temp_url, file_image });
    }

    // ส่งต่อให้ Service เพื่อรวมรูป
    const mergedImage = await this.customerService.generatePreview(groupedFiles);

    res.setHeader('Content-Type', 'image/png');
    res.send(mergedImage);
  }

  @Get('generateuuid')
  newCustomer() {
    const uuid = this.customerService.generate();
    return { uuid };
  }

  @Post('upload-image')
@UseInterceptors(FileInterceptor('file'))
async uploadImage( 
  @UploadedFile() file: Express.Multer.File,
  @Body('slotIndex') slotIndexStr: string,
): Promise<UploadResultDto> {
  const slotIndex = Number(slotIndexStr);

  if (!['image/png', 'image/jpeg'].includes(file.mimetype)) {
    throw new BadRequestException('File type not supported');
  }

  const url = await this.customerService.uploadImageFile(slotIndex, file);
  return { slotIndex, url, filename: file.originalname };
}
}



