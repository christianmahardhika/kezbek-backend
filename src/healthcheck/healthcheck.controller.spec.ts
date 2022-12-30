import { TerminusModule } from '@nestjs/terminus';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configuration } from '../config/config';
import { HealthcheckController } from './healthcheck.controller';
import { HealthcheckService } from './healthcheck.service';

describe('HealthcheckController', () => {
  let controller: HealthcheckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    }).compile();

    controller = module.get<HealthcheckController>(HealthcheckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
