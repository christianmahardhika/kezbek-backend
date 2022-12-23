import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthcheckModule } from './healthcheck/healthcheck.module';

@Module({
  imports: [HealthcheckModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
