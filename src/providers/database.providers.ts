import { DataSource } from 'typeorm';
import { configuration } from '../config/config';
export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configuration.GetPostgresConfig().host,
        port: 5432,
        username: configuration.GetPostgresConfig().username,
        password: configuration.GetPostgresConfig().password,
        database: configuration.GetPostgresConfig().database,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: configuration.GetPostgresConfig().synchronize,
      });

      return dataSource.initialize();
    },
  },
];
