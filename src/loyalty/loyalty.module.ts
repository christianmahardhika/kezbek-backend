import { Module } from '@nestjs/common';
import { LoyaltyService } from './loyalty.service';
import { LoyaltyController } from './loyalty.controller';

@Module({
  controllers: [LoyaltyController],
  providers: [LoyaltyService]
})
export class LoyaltyModule {}
