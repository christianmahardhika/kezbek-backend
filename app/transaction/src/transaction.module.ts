import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configuration } from 'src/config/config';
import { HealthcheckModule } from 'src/healthcheck/healthcheck.module';
import { TransactionRepository } from './repository/transaction.repository';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  imports: [
    HealthcheckModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configuration.GetPostgresConfig().host,
      port: configuration.GetPostgresConfig().port,
      username: configuration.GetPostgresConfig().username,
      password: configuration.GetPostgresConfig().password,
      database: configuration.GetPostgresConfig().database,
      synchronize: configuration.GetPostgresConfig().synchronize,
      autoLoadEntities: true,
    }),
    ClientsModule.registerAsync([
      {
        name: 'PROMO_SERVICE',
        useFactory: () => ({
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
            prefetchCount: 1,
          },
        }),
      },
      {
        name: 'LOYALTY_SERVICE',
        useFactory: () => ({
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
            queue: configuration.GetRabbitMQConfig().queue_loyalty,
            queueOptions: {
              durable: false,
            },
            prefetchCount: 1,
          },
        }),
      },
    ]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService, TransactionRepository],
})
export class TransactionModule {}
