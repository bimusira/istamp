import { Injectable } from '@nestjs/common';
import { createCanvas, loadImage } from 'canvas';
import { v4 as uuidv4 } from 'uuid';
import { Express } from 'express';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class CustomerService {
  generate(): string {
    return uuidv4();
  }

  async generatePreview(
    groupedFiles: Array<{
      slot: string;
      temp_url: string;
      file_image: Express.Multer.File;
    }>
  ): Promise<Buffer> {
     // โหลดพื้นหลังจาก temp_url ของ slot 1
    const template = await loadImage(groupedFiles[0].temp_url);
    const canvas = createCanvas(template.width, template.height);
    const ctx = canvas.getContext('2d');

    for (const item of groupedFiles) {
      const image = await loadImage(item.file_image.buffer);
      const { x, y, width, height } = this.getPositionBySlot(item.slot);
      ctx.drawImage(image, x, y, width, height);
    }

    return canvas.toBuffer('image/png');
  }

  getPositionBySlot(slot: string) {
    const map = {
      '1': { x: 303, y: 1588, width: 366, height: 337 },
      '2': { x: 303, y: 1936, width: 366, height: 337 },
      '3': { x: 857, y: 1588, width: 366, height: 337 },
      '4': { x: 857, y: 1936, width: 366, height: 337 },
      
    };
    return map[slot] || { x: 0, y: 0, width: 100, height: 100 };
  }

  async uploadImageFile(slotIndex: number, file: Express.Multer.File): Promise<string> {
    const filename = `slot${slotIndex}_${Date.now()}.${file.mimetype.split('/')[1]}`;
    const filePath = path.join(__dirname, '../../uploads', filename);

    if (!fs.existsSync(path.dirname(filePath))) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }

    await fs.promises.writeFile(filePath, file.buffer);

    return `/uploads/${filename}`;
  }
}
