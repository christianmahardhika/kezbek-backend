import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configuration } from 'src/config/config';
import { HealthcheckController } from './healthcheck.controller';
import { HealthcheckService } from './healthcheck.service';

@Module({
  controllers: [HealthcheckController],
  providers: [HealthcheckService],
  imports: [
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
    TerminusModule,
  ],
})
export class HealthcheckModule {}
