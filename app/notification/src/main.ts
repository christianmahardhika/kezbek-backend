import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { configuration } from './config/config';

async function bootstrap() {
  configuration.New();
  const logger = new Logger('Notification Service');
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 3004;
  await app.listen(PORT);
  logger.log(`Notification Service is running on port ${PORT}`);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [
        configuration.GetRabbitMQConfig().protocol +
          configuration.GetRabbitMQConfig().username +
          ':' +
          configuration.GetRabbitMQConfig().password +
          '@' +
          configuration.GetRabbitMQConfig().host +
          ':' +
          configuration.GetRabbitMQConfig().port,
      ],
      queue: configuration.GetRabbitMQConfig().queue_notification,
      queueOptions: {
        durable: false,
      },
      prefetchcount: 1,
    },
  });
  await app.startAllMicroservices();
  logger.log(`Notification Service listening to RabbitMQ`);
}
bootstrap();
