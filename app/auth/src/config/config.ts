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

// cognito config type
type CognitoConfig = {
  userPoolId: string;
  clientId: string;
};

class Config {
  New(): void {
    dotenv.config({ path: './src/config/.env' });
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

  // cognito config env
  GetCognitoConfig(): CognitoConfig {
    return {
      userPoolId: process.env.COGNITO_USER_POOL_ID || '',
      clientId: process.env.COGNITO_CLIENT_ID || '',
    };
  }
}

export const configuration = new Config();
