// use dotenv
import * as dotenv from 'dotenv';

// postgress Database config type
type PostgresConfig = {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
};

// rabbitmq config type
type RabbitMQConfig = {
  host: string;
  port: number;
  protocol: string;
  username: string;
  password: string;
  queue: string;
  queue_promo: string;
  queue_loyalty: string;
  queue_transaction: string;
  exchange: string;
  routingKey: string;
  queueDurable: boolean;
  queueExclusive: boolean;
  queueAutoDelete: boolean;
  queueNoAck: boolean;
  queuePrefetchCount: number;
  queuePrefetchSize: number;
  queuePrefetchGlobal: boolean;
  queueRequeue: boolean;
  queueRequeueDelay: number;
  queueRequeueMaxRetries: number;
  queueRequeueMaxRetriesInterval: number;
  queueReq: boolean;
};

class Config {
  New(): void {
    dotenv.config();
  }
  // postgress config env
  GetPostgresConfig(): PostgresConfig {
    return {
      type: process.env.POSTGRES_TYPE || 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: parseInt(process.env.POSTGRES_PORT) || 5432,
      username: process.env.POSTGRES_USERNAME || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'postgres',
      database: process.env.POSTGRES_DATABASE || 'postgres',
      synchronize: process.env.POSTGRES_SYNCHRONIZE === 'true',
    };
  }

  // rabbitmq config env
  GetRabbitMQConfig(): RabbitMQConfig {
    return {
      host: process.env.RABBITMQ_HOST || 'localhost',
      port: parseInt(process.env.RABBITMQ_PORT) || 5672,
      protocol: process.env.RABBITMQ_PROTOCOL || 'amqp://',
      username: process.env.RABBITMQ_USERNAME || 'rabbitmq',
      password: process.env.RABBITMQ_PASSWORD || 'rabbitmq',
      queue: process.env.RABBITMQ_QUEUE || 'test',
      queue_promo: process.env.RABBITMQ_QUEUE_PROMO || 'promo',
      queue_loyalty: process.env.RABBITMQ_QUEUE_LOYALTY || 'loyalty',
      queue_transaction:
        process.env.RABBITMQ_QUEUE_TRANSACTION || 'transaction',
      exchange: process.env.RABBITMQ_EXCHANGE,
      routingKey: process.env.RABBITMQ_ROUTINGKEY,
      queueDurable: process.env.RABBITMQ_QUEUE_DURABLE === 'true',
      queueExclusive: process.env.RABBITMQ_QUEUE_EXCLUSIVE === 'true',
      queueAutoDelete: process.env.RABBITMQ_QUEUE_AUTODELETE === 'true',
      queueNoAck: process.env.RABBITMQ_QUEUE_NOACK === 'true',
      queuePrefetchCount: parseInt(process.env.RABBITMQ_QUEUE_PREFETCHCOUNT),
      queuePrefetchSize: parseInt(process.env.RABBITMQ_QUEUE_PREFETCHSIZE),
      queuePrefetchGlobal: process.env.RABBITMQ_QUEUE_PREFETCHGLOBAL === 'true',
      queueRequeue: process.env.RABBITMQ_QUEUE_REQUEUE === 'true',
      queueRequeueDelay: parseInt(process.env.RABBITMQ_QUEUE_REQUEUEDELAY),
      queueRequeueMaxRetries: parseInt(
        process.env.RABBITMQ_QUEUE_REQUEUEMAXRETRIES,
      ),
      queueRequeueMaxRetriesInterval: parseInt(
        process.env.RABBITMQ_QUEUE_REQUEUEMAXRETRIESINTERVAL,
      ),
      queueReq: process.env.RABBITMQ_QUEUE_REQ === 'true',
    };
  }
}

export const configuration = new Config();
