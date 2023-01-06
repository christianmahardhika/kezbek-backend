import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configuration } from './config/config';

async function bootstrap() {
  configuration.New();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
