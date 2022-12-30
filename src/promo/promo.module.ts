import { Module } from '@nestjs/common';
import { PromoService } from './promo.service';
import { PromoController } from './promo.controller';

@Module({
  controllers: [PromoController],
  providers: [PromoService]
})
export class PromoModule {}
