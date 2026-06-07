import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Filtra cualquier dato extra que mande el frontend y no esté en el DTO
    forbidNonWhitelisted: true, // Tira un error si alguien intenta mandar campos inventados
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
