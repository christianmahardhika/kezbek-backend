// use dotenv
import * as dotenv from 'dotenv';

// Amazon SES config type
type AmazonSESConfig = {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
};

// SMTP config type
type SMTPConfig = {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  from_email: string;
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
  queue_notification: string;
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
    dotenv.config({ path: './src/config/.env' });
  }

  // SMTP config env
  GetSMTPConfig(): SMTPConfig {
    return {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT) || 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER || '',
        pass: process.env.SMTP_PASS || '',
      },
      from_email: process.env.SMTP_FROM_EMAIL || '',
    };
  }

  // Amazon SES config env
  GetAmazonSESConfig(): AmazonSESConfig {
    return {
      accessKeyId: process.env.AMAZON_SES_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.AMAZON_SES_SECRET_ACCESS_KEY || '',
      region: process.env.AMAZON_SES_REGION || '',
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
      queue: process.env.RABBITMQ_QUEUE || 'transaction',
      queue_promo: process.env.RABBITMQ_QUEUE_PROMO || 'promo',
      queue_loyalty: process.env.RABBITMQ_QUEUE_LOYALTY || 'loyalty',
      queue_notification:
        process.env.RABBITMQ_QUEUE_NOTIFICATION || 'notification',
      queue_transaction:
        process.env.RABBITMQ_QUEUE_TRANSACTION || 'transaction',
      exchange: process.env.RABBITMQ_EXCHANGE || 'amq.topic',
      routingKey: process.env.RABBITMQ_ROUTING_KEY || 'transaction',
      queueDurable: process.env.RABBITMQ_QUEUE_DURABLE === 'true',
      queueExclusive: process.env.RABBITMQ_QUEUE_EXCLUSIVE === 'true',
      queueAutoDelete: process.env.RABBITMQ_QUEUE_AUTODELETE === 'true',
      queueNoAck: process.env.RABBITMQ_QUEUE_NOACK === 'true',
      queuePrefetchCount:
        parseInt(process.env.RABBITMQ_QUEUE_PREFETCH_COUNT) || 1,
      queuePrefetchSize:
        parseInt(process.env.RABBITMQ_QUEUE_PREFETCH_SIZE) || 0,
      queuePrefetchGlobal:
        process.env.RABBITMQ_QUEUE_PREFETCH_GLOBAL === 'true',
      queueRequeue: process.env.RABBITMQ_QUEUE_REQUEUE === 'true',
      queueRequeueDelay:
        parseInt(process.env.RABBITMQ_QUEUE_REQUEUE_DELAY) || 0,
      queueRequeueMaxRetries:
        parseInt(process.env.RABBITMQ_QUEUE_REQUEUE_MAX_RETRIES) || 0,
      queueRequeueMaxRetriesInterval:
        parseInt(process.env.RABBITMQ_QUEUE_REQUEUE_MAX_RETRIES_INTERVAL) || 0,
      queueReq: process.env.RABBITMQ_QUEUE_REQ === 'true',
    };
  }
}

export const configuration = new Config();
