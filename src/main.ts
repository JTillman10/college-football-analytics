import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as env from 'dotenv';

async function bootstrap() {
  // env.config();

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
