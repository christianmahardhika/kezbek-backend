import Redis from 'ioredis';
import { configuration } from 'src/config/config';

export const cacheProviders = [
  {
    provide: 'CACHE_MANAGER',
    useFactory: async () => {
      const redis = new Redis({
        host: configuration.GetRedisConfig().host,
        port: configuration.GetRedisConfig().port,
        password: configuration.GetRedisConfig().password,
      });
      return redis;
    },
  },
];
