import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configuration } from './config/config';
import { TransactionModule } from './transaction.module';

async function bootstrap() {
  configuration.New();
  const logger = new Logger('Transaction Service');
  const app = await NestFactory.create(TransactionModule);
  const config = new DocumentBuilder()
    .setTitle('Kezbek Documentation - Transaction Service')
    .setDescription('Kezbek API documentation for developers')
    .setVersion('1.0')
    .addTag('kezbek-promo')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-document', app, document);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  logger.log(`Transaction Service is running on port ${PORT}`);

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
    },
  });
  await app.startAllMicroservices();
  logger.log(`Transaction Service listening to RabbitMQ`);
}
bootstrap();
