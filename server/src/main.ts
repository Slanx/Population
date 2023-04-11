import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const PORT = process.env.SERVER_PORT || 4000;

  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  await app.listen(PORT);
}
bootstrap();
