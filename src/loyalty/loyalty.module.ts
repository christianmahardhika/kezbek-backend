import { Module } from '@nestjs/common';
import { LoyaltyController } from './loyalty.controller';

@Module({
  controllers: [LoyaltyController]
})
export class LoyaltyModule {}
