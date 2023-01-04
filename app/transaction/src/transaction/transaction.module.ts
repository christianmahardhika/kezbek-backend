import { Module } from '@nestjs/common';
import {
  TransactionHistoryRepository,
  TransactionRepository,
} from './repository/transaction.repository';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  controllers: [TransactionController],
  providers: [
    TransactionService,
    TransactionRepository,
    TransactionHistoryRepository,
  ],
})
export class TransactionModule {}
