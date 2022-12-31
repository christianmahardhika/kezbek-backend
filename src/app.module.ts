import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { LoyaltyModule } from './loyalty/loyalty.module';
import { PromoModule } from './promo/promo.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [HealthcheckModule, LoyaltyModule, PromoModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
