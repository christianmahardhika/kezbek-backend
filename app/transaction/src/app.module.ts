import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthcheckModule } from './healthcheck/healthcheck.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [HealthcheckModule,TransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
