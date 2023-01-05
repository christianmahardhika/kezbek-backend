import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configuration } from 'src/config/config';
import { Promo } from './entities/promo.entity';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { PromoController } from './promo.controller';
import { PromoService } from './promo.service';
import { PromoRepository } from './repository/promo.repository';

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
      entities: [Promo],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ClientsModule.registerAsync([
      {
        name: 'TRANSACTION_SERVICE',
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
            queue: configuration.GetRabbitMQConfig().queue_transaction,
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
  ],
  controllers: [PromoController],
  providers: [PromoService, PromoRepository],
})
export class PromoModule {}
