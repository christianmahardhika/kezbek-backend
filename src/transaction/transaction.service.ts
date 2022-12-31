import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { GetTransactionHistoryDTO } from './dto/get-transaction-dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionService {
  create(createTransactionDto: CreateTransactionDto) {
    return 'This action adds a new transaction';
  }

  findByDateAndPartnerID(
    start_date: Date,
    end_date: Date,
    partner_id: string,
  ): GetTransactionHistoryDTO[] {
    return [
      {
        id: '5f9f1c5b-7b1e-4b5c-8c1c-8c1c8c1c8c1c',
        transaction_id: '5f9f1c5b-7b1e-4b5c-8c1c-8c1c8c1c8c1c',
        customer_id: '5f9f1c5b-7b1e-4b5c-8c1c-8c1c8c1c8c1c',
        partner_id: '5f9f1c5b-7b1e-4b5c-8c1c-8c1c8c1231c',
        is_cashback_applied: true,
        cashback_amount: 1000,
        transaction_amount: 100000,
        transaction_quantity: 1,
        tier_reward_amount: 1000,
        tier: 1,
        total_reward_amount: 1000,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date(),
      },
      {
        id: '5f9f1c5b-7b1e-4b5c-8c1c-8c1c8c1c8c1c',
        transaction_id: '5f9f1c5b-7b1e-4b5c-8c1c-8c1c8c1c8c1c',
        customer_id: '5f9f1c5b-7b1e-4b5c-8c1c-8c1c8c1c8c1c',
        partner_id: '5f9f1c5b-7b1e-4b5c-8c1c-8c1c8c1231c',
        is_cashback_applied: true,
        cashback_amount: 1000,
        transaction_amount: 100000,
        transaction_quantity: 1,
        tier_reward_amount: 1000,
        tier: 1,
        total_reward_amount: 1000,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date(),
      },
    ];
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
