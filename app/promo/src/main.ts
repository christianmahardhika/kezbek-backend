import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configuration } from './config/config';
import { PromoModule } from './promo.module';

async function bootstrap() {
  configuration.New();
  const logger = new Logger('Promo Service');
  const app = await NestFactory.create(PromoModule);

  const config = new DocumentBuilder()
    .setTitle('Kezbek Documentation - Promo Service')
    .setDescription('Kezbek API documentation for developers')
    .setVersion('1.0')
    .addTag('kezbek-promo')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-document', app, document);

  const PORT = process.env.PORT || 3002;
  await app.listen(PORT);
  logger.log(`Promo Service is running on port ${PORT}`);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [
        'amqp://' +
          configuration.GetRabbitMQConfig().username +
          ':' +
          configuration.GetRabbitMQConfig().password +
          '@' +
          configuration.GetRabbitMQConfig().host +
          ':' +
          configuration.GetRabbitMQConfig().port,
      ],
      queue: configuration.GetRabbitMQConfig().queue_promo,
      queueOptions: {
        durable: false,
      },
      prefetchcount: 1,
    },
  });
  await app.startAllMicroservices();
  logger.log(`Promo Service listening to RabbitMQ`);
}
bootstrap();
