import { Controller, Get } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import {
  HealthCheck,
  HealthCheckService,
  MicroserviceHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { configuration } from 'src/config/config';

@Controller('healthcheck')
export class HealthcheckController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private microservice: MicroserviceHealthIndicator,
  ) {}
  @Get()
  @HealthCheck()
  check() {
    return this.healthCheckService.check([
      () => this.db.pingCheck('postgres', { timeout: 1500 }),
      () =>
        this.microservice.pingCheck('rabbitmq', {
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
        }),
    ]);
  }
}
