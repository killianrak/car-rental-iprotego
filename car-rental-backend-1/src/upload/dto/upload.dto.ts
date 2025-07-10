import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class UploadFileDto {
  @IsNotEmpty({ message: 'Nom du fichier requis' })
  @IsString()
  fileName: string;

  @IsNotEmpty({ message: 'Nom original requis' })
  @IsString()
  originalName: string;

  @IsNotEmpty({ message: 'Chemin du fichier requis' })
  @IsString()
  filePath: string;

  @IsNotEmpty({ message: 'Type MIME requis' })
  @IsString()
  mimeType: string;

  @IsNotEmpty({ message: 'Taille du fichier requise' })
  @IsNumber()
  size: number;
}

export class FileResponseDto {
  @IsString()
  message: string;

  @IsString()
  fileName: string;

  @IsString()
  filePath: string;
}

export class GetFilesQueryDto {
  @IsOptional()
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsNumber()
  limit?: number;
}