import { Module } from '@nestjs/common';
import { PromoController } from './promo.controller';
import { PromoService } from './promo.service';
import { PromoRepository } from './repository/promo.repository';

@Module({
  controllers: [PromoController],
  providers: [PromoService, PromoRepository],
})
export class PromoModule {}
