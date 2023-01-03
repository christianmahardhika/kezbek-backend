import { Injectable } from '@nestjs/common/decorators';
import { Between, DataSource, Repository } from 'typeorm';
import {
  CreateTransactionDto,
  CreateTransactionHistoryDto,
} from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import {
  Transaction,
  TransactionHistory,
} from '../entities/transaction.entity';

@Injectable()
export class TransactionRepository extends Repository<Transaction> {
  constructor(private readonly dataSource: DataSource) {
    super(Transaction, dataSource.createEntityManager());
  }

  async createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return await this.save(createTransactionDto);
  }

  async updateTransaction(
    updateTransaction: UpdateTransactionDto,
  ): Promise<Transaction> {
    return await this.save(updateTransaction);
  }
}

@Injectable()
export class TransactionHistoryRepository extends Repository<TransactionHistory> {
  constructor(private readonly dataSource: DataSource) {
    super(TransactionHistory, dataSource.createEntityManager());
  }

  async createTransactionHistory(
    createTransactionHistoryDto: CreateTransactionHistoryDto,
  ): Promise<TransactionHistory> {
    return await this.save(createTransactionHistoryDto);
  }

  async findTransactionHistoryByPartnerID(
    start_date: Date,
    end_date: Date,
    partner_id: string,
  ): Promise<TransactionHistory[]> {
    return await this.find({
      where: { partner_id, created_at: Between(start_date, end_date) },
    });
  }
}
