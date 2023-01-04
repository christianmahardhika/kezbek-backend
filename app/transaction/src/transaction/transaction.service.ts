import { Injectable } from '@nestjs/common';
import {
  CreateTransactionDto,
  SubmitTransactionDto,
  SubmitTransactionReturnDto,
} from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction, TransactionHistory } from './entities/transaction.entity';
import {
  TransactionHistoryRepository,
  TransactionRepository,
} from './repository/transaction.repository';

@Injectable()
export class TransactionService {
  constructor(
    private readonly repositoryTransaction: TransactionRepository,
    private readonly repositoryTransactionHistory: TransactionHistoryRepository,
  ) {}
  create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    return this.repositoryTransaction.createTransaction(createTransactionDto);
  }

  submitTransaction(
    submitTransactionDto: SubmitTransactionDto,
  ): Promise<SubmitTransactionReturnDto> {
    return new Promise((resolve, reject) => {
      try {
        // TODO: Implement check if customer is eligible for cashback (hit promo service)

        // TODO: Implement check if customer is eligible for tier reward (hit loyalty service)

        // TODO: Implement calculate cashback amount, tier reward, and reward (add to queue)

        // TODO: Implement send email notification to customer (add to queue)

        const data = new SubmitTransactionReturnDto(
          true,
          'Transaction submitted successfully',
          '5f9f1c5b-7b1e-4b5c-8c1c-8c1c8c1c8c1c',
        );
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  findByDateAndPartnerID(
    start_date: Date,
    end_date: Date,
    partner_id: string,
  ): Promise<TransactionHistory[]> {
    return this.repositoryTransactionHistory.findTransactionHistoryByPartnerID(
      start_date,
      end_date,
      partner_id,
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
