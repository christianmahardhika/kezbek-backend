import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { PromoModule } from './promo/promo.module';

@Module({
  imports: [HealthcheckModule, PromoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
