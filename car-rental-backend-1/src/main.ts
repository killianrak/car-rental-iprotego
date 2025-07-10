import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  // Crée l'application NestJS
  const app = await NestFactory.create(AppModule);
  
  // Active la validation automatique des DTOs
  app.useGlobalPipes(new ValidationPipe());
  
  // Autorise les requêtes cross-origin (pour React)
  app.enableCors();
  
  // Démarre le serveur sur le port 3001
  await app.listen(3001);
  console.log('Backend started on http://localhost:3001');
}
bootstrap();