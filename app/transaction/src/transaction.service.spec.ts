import { Test, TestingModule } from '@nestjs/testing';
import { CashBackDto, CashbackPrecentageDto } from './dto/cashback.dto';
import {
  SubmitTransactionDto,
  SubmitTransactionReturnDto,
} from './dto/create-transaction.dto';
import { LoyaltyDto } from './dto/loyalty.dto';
import { Transaction } from './entities/transaction.entity';
import { TransactionProvider } from './provider/transaction.provider';
import { TransactionRepository } from './repository/transaction.repository';
import { TransactionService } from './transaction.service';

describe('TransactionService', () => {
  let service: TransactionService;
  let mockTransactionEntity: Transaction;
  let mockLoyaltyDto: LoyaltyDto;
  let mockCashbackDto: CashBackDto;
  let mockCashbackPrecentageDto: CashbackPrecentageDto;
  let number: number;

  const mockRepositoryTransaction = {
    createTransaction: jest.fn(() => Promise.resolve(mockTransactionEntity)),
    findLastTransactionByCustomerEmail: jest.fn(() =>
      Promise.resolve(mockTransactionEntity),
    ),
  };

  const mockProviderTransaction = {
    checkTierByCustomerEmail: jest.fn(() => Promise.resolve(mockLoyaltyDto)),
    getCashback: jest.fn(() => Promise.resolve(number)),
    getReward: jest.fn(() => Promise.resolve(number)),
    updateLoyalty: jest.fn(),
    sendEmailNotification: jest.fn(),
    sendCashbackToPaymentProvider: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        { provide: TransactionRepository, useValue: mockRepositoryTransaction },
        { provide: TransactionProvider, useValue: mockProviderTransaction },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);

    mockLoyaltyDto = {
      //uuid generated from uuidv4
      id: 'b3b4c1c0-5b9f-4b9f-8c1c-0b9f4b9f8c1c',
      // generated mock email
      customer_email: 'john.doe@test.com',
      current_tier_name: 'Gold',
      current_tier: 2,
      next_tier: 3,
      previous_tier: 1,
      is_point_send: false,
      reccuring_transaction: 7,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
      upgradeTierReward: jest.fn(),
      downgradeTierReward: jest.fn(),
    };

    mockCashbackDto = {
      trans_quantity: 1,
      trans_amount: 100000,
    };

    mockTransactionEntity = {
      id: '5f9f1c5b-7b1e-4b5c-8c1c-8c1c8c1c8c1c',
      customer_email: 'john.doe@test.com',
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
      deleted_at: null,
    };

    mockTransactionEntity = {
      id: '5f9f1c5b-7b1e-4b5c-8c1c-8c1c8c1c8c1c',
      customer_email: 'john.doe@test.com',
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
      deleted_at: null,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('submit transaction', () => {
    it('should return transaction entity', async () => {
      // Arrange

      const mockSubmitDto: SubmitTransactionDto = {
        partner_name: 'tokopedia',
        customer_msisdn: '081234567890',
        payment_provider: 'gopay',
        transaction_amount: mockTransactionEntity.transaction_amount,
        transaction_quantity: mockTransactionEntity.transaction_quantity,
        customer_email: mockTransactionEntity.customer_email,
        partner_id: mockTransactionEntity.partner_id,
      };
      const submitTransactionReturnDto: SubmitTransactionReturnDto = {
        data: mockTransactionEntity.id,
        isSuceess: true,
        message: 'Transaction submitted successfully',
      };

      const spyCreateTransaction = jest
        .spyOn(mockRepositoryTransaction, 'createTransaction')
        .mockResolvedValue(mockTransactionEntity);

      const spyFindLastTransactionByCustomerEmail = jest
        .spyOn(mockRepositoryTransaction, 'findLastTransactionByCustomerEmail')
        .mockResolvedValue(mockTransactionEntity);

      const spyCheckTierByCustomerEmail = jest
        .spyOn(mockProviderTransaction, 'checkTierByCustomerEmail')
        .mockResolvedValue(mockLoyaltyDto);

      const spyGetCashback = jest
        .spyOn(mockProviderTransaction, 'getCashback')
        .mockResolvedValue(1.5);

      const spyGetReward = jest
        .spyOn(mockProviderTransaction, 'getReward')
        .mockResolvedValue(100);
      const spySendCashbackToPaymentProvider = jest.spyOn(
        mockProviderTransaction,
        'sendCashbackToPaymentProvider',
      );

      // Act
      const result = await service.submitTransaction(mockSubmitDto);

      // Assert
      expect(result).toEqual(submitTransactionReturnDto);
      expect(spyCreateTransaction).toBeCalledTimes(1);
      expect(spyFindLastTransactionByCustomerEmail).toBeCalledTimes(1);
      expect(spyCheckTierByCustomerEmail).toBeCalledTimes(1);
      expect(spyGetCashback).toBeCalledTimes(1);
      expect(spySendCashbackToPaymentProvider).toBeCalledTimes(1);
      expect(spyGetReward).toBeCalledTimes(1);
    });
  });
});
