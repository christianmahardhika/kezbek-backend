import { Test, TestingModule } from '@nestjs/testing';
import { Transaction, TransactionHistory } from './entities/transaction.entity';
import {
  TransactionHistoryRepository,
  TransactionRepository,
} from './repository/transaction.repository';
import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
  let service: TransactionService;
  let mockTransactionEntity: Transaction;
  let mockTransactionHistoryEntity: TransactionHistory;

  const mockRepositoryTransaction = {
    createTransaction: jest.fn(() => Promise.resolve(mockTransactionEntity)),
    updateTransaction: jest.fn(() => Promise.resolve(mockTransactionEntity)),
  };

  const mockRepositoryTransactionHistory = {
    findTransactionHistoryByPartnerID: jest.fn(() =>
      Promise.resolve(mockTransactionHistoryEntity),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        { provide: TransactionRepository, useValue: mockRepositoryTransaction },
        {
          provide: TransactionHistoryRepository,
          useValue: mockRepositoryTransactionHistory,
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
