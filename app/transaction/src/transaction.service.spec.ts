import { HttpService } from '@nestjs/axios';
import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { Transaction } from './entities/transaction.entity';
import { TransactionRepository } from './repository/transaction.repository';
import { TransactionService } from './transaction.service';
import { mock } from './__utils';

describe('TransactionService', () => {
  let service: TransactionService;
  let mockTransactionEntity: Transaction;

  const mockRepositoryTransaction = {
    createTransaction: jest.fn(() => Promise.resolve(mockTransactionEntity)),
    updateTransaction: jest.fn(() => Promise.resolve(mockTransactionEntity)),
  };

  const simulationClientMock = mock<ClientProxy>('connect', 'send', 'emit');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        { provide: TransactionRepository, useValue: mockRepositoryTransaction },
        { provide: 'PROMO_SERVICE', useValue: simulationClientMock },
        { provide: 'LOYALTY_SERVICE', useValue: simulationClientMock },
        { provide: 'NOTIFICATION_SERVICE', useValue: simulationClientMock },
        { provide: HttpService, useValue: jest.fn() },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
