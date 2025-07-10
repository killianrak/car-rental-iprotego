import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  private readonly allowedMimeTypes = ['application/pdf', 'image/jpeg', 'image/jpg'];
  private readonly maxSize = 5 * 1024 * 1024; // 5MB

  transform(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Aucun fichier fourni');
    }

    // Vérifier le type MIME
    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Seuls les fichiers PDF et JPEG sont acceptés');
    }

    // Vérifier la taille
    if (file.size > this.maxSize) {
      throw new BadRequestException('Le fichier ne peut pas dépasser 5MB');
    }

    // Vérifier l'extension du fichier
    const allowedExtensions = ['.pdf', '.jpg', '.jpeg'];
    const fileExtension = file.originalname.toLowerCase().substring(file.originalname.lastIndexOf('.'));
    
    if (!allowedExtensions.includes(fileExtension)) {
      throw new BadRequestException('Extension de fichier non autorisée');
    }

    return file;
  }
}