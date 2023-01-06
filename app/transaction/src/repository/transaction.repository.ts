import { Injectable } from '@nestjs/common/decorators';
import { DataSource, Repository } from 'typeorm';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import { Transaction } from '../entities/transaction.entity';

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

  async findLastTransactionByCustomerEmail(
    customer_email: string,
  ): Promise<Transaction> {
    return await this.findOne({
      where: { customer_email },
      order: { created_at: 'DESC' },
    });
  }
}
