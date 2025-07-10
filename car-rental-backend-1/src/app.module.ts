import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AuthController } from './auth/auth.controller';
import { UploadController } from './upload/upload.controller';
import { AuthService } from './auth/auth.service';
import { UploadService } from './upload/upload.service';
import { User } from './user.entity';
import { UploadFile } from './upload.entity';
import { JwtStrategy } from './auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [User, UploadFile],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, UploadFile]),
    PassportModule,
    JwtModule.register({
      secret: 'carrental',
      signOptions: { expiresIn: '7d' },
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
          cb(null, `${uniqueName}${extname(file.originalname)}`);
        },
      }),
    }),
  ],
  controllers: [AuthController, UploadController],
  providers: [AuthService, UploadService, JwtStrategy],
})
export class AppModule {}