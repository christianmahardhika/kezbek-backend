import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { LoyaltyModule } from './loyalty/loyalty.module';

@Module({
  imports: [LoyaltyModule, HealthcheckModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
