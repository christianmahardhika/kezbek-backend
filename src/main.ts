import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { configuration } from './config/config';

async function bootstrap() {
  configuration.New();
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Kezbek Documentation')
    .setDescription('Kezbek API documentation for developers. This is a sample')
    .setVersion('1.0')
    .addTag('kezbek')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
