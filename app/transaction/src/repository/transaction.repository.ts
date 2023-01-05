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

  createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.save(createTransactionDto);
  }

  updateTransaction(
    updateTransaction: UpdateTransactionDto,
  ): Promise<Transaction> {
    return this.save(updateTransaction);
  }

  async findLastTransactionByCustomerEmail(
    customer_email: string,
  ): Promise<Transaction> {
    return this.findOne({
      select: ['id', 'customer_email', 'partner_id', 'created_at'],
      where: { customer_email },
      order: { created_at: 'DESC' },
    });
  }
}
