import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadFile } from '../upload.entity';
import { User } from '../user.entity';

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(UploadFile)
    private uploadRepository: Repository<UploadFile>,
  ) {}

  async uploadFile(file: Express.Multer.File, user: User) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const allowedTypes = ['application/pdf', 'image/jpeg'];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException('Only PDF and JPEG files are allowed');
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new BadRequestException('File size cannot exceed 5MB');
    }

    const uploadFile = this.uploadRepository.create({
      fileName: file.filename,
      originalName: file.originalname,
      filePath: file.path,
      mimeType: file.mimetype,
      size: file.size,
      user,
    });

    await this.uploadRepository.save(uploadFile);

    return {
      message: 'File uploaded successfully',
      fileName: file.filename,
      filePath: file.path,
    };
  }
}