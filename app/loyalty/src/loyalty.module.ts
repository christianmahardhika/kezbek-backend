import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configuration } from 'src/config/config';
import { Loyalty, LoyaltyRules } from './entities/loyalty.entity';
import { LoyaltyController } from './loyalty.controller';
import { LoyaltyService } from './loyalty.service';
import {
  LoyaltyRepository,
  LoyaltyRulesRepository,
} from './repository/loyalty.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configuration.GetPostgresConfig().host,
      port: configuration.GetPostgresConfig().port,
      username: configuration.GetPostgresConfig().username,
      password: configuration.GetPostgresConfig().password,
      database: configuration.GetPostgresConfig().database,
      entities: [Loyalty, LoyaltyRules],
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
        name: 'TRANSACTION_SERVICE',
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
            queue: configuration.GetRabbitMQConfig().queue_transaction,
            queueOptions: {
              durable: false,
            },
            prefetchCount: 1,
          },
        }),
      },
    ]),
  ],
  controllers: [LoyaltyController],
  providers: [LoyaltyService, LoyaltyRepository, LoyaltyRulesRepository],
})
export class LoyaltyModule {}
