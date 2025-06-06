import { Controller, Get, Post, UploadedFile, UseInterceptors, Body, BadRequestException } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express';
import { UploadResultDto } from './dto/upload-result.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

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



