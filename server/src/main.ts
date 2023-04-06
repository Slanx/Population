import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';

async function bootstrap() {
  const PORT = process.env.SERVER_PORT || 4000;

  const app = await NestFactory.create(AppModule);

  await app.listen(PORT);
}
bootstrap();
