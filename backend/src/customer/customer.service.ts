import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Express } from 'express';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class CustomerService {
  generate(): string {
    return uuidv4();
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
