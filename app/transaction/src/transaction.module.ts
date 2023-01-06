import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configuration } from 'src/config/config';
import { Transaction } from './entities/transaction.entity';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { TransactionRepository } from './repository/transaction.repository';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configuration.GetPostgresConfig().host,
      port: configuration.GetPostgresConfig().port,
      username: configuration.GetPostgresConfig().username,
      password: configuration.GetPostgresConfig().password,
      database: configuration.GetPostgresConfig().database,
      entities: [Transaction],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ClientsModule.registerAsync([
      {
        name: 'PROMO_SERVICE',
        useFactory: () => ({
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
              configuration.GetRabbitMQConfig().protocol +
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
    HttpModule,
    HealthcheckModule,
  ],
  controllers: [TransactionController],
  providers: [TransactionService, TransactionRepository],
})
export class TransactionModule {}
