import { Test, TestingModule } from '@nestjs/testing';
import { pick } from 'lodash';
import { DataSource } from 'typeorm';
import {
  CreateTransactionDto,
  CreateTransactionHistoryDto,
} from '../dto/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/update-transaction.dto';
import {
  Transaction,
  TransactionHistory,
} from '../entities/transaction.entity';
import {
  TransactionHistoryRepository,
  TransactionRepository,
} from './transaction.repository';

describe('TransactionRepository', () => {
  let repository: TransactionRepository;
  let mockTransactionEntity: Transaction;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionRepository,
        {
          provide: DataSource,
          useValue: {
            createEntityManager: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<TransactionRepository>(TransactionRepository);

    mockTransactionEntity = {
      id: '5f9f1c5b-7b1e-4b5c-8c1c-8c1c8c1c8c1c',
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
      deleted_at: null,
    };
  });

  afterEach = () => {
    jest.clearAllMocks();
  };

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('Create New Transaction', () => {
    it('should return new transaction', async () => {
      // setup
      const createTransactionDTO: CreateTransactionDto = pick(
        mockTransactionEntity,
        [
          'customer_id',
          'partner_id',
          'is_cashback_applied',
          'cashback_amount',
          'transaction_amount',
          'transaction_quantity',
          'tier_reward_amount',
          'tier',
          'total_reward_amount',
        ],
      );

      const mockRepoMethods = jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockTransactionEntity);

      // act
      const result = await repository.createTransaction(createTransactionDTO);

      // assert
      expect(result).toEqual(mockTransactionEntity);
      expect(mockRepoMethods).toBeCalled();
    });
  });

  describe('Update Transaction', () => {
    it('should return updated transaction', async () => {
      // setup
      const updateTransactionDTO: UpdateTransactionDto = pick(
        mockTransactionEntity,
        [
          'id',
          'customer_id',
          'partner_id',
          'is_cashback_applied',
          'cashback_amount',
          'transaction_amount',
          'transaction_quantity',
          'tier_reward_amount',
          'tier',
          'total_reward_amount',
        ],
      );

      const mockRepoMethods = jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockTransactionEntity);

      // act
      const result = await repository.updateTransaction(updateTransactionDTO);

      // assert
      expect(result).toEqual(mockTransactionEntity);
      expect(mockRepoMethods).toBeCalled();
    });
  });
});

describe('TransactionHistoryRepository', () => {
  let repository: TransactionHistoryRepository;
  let mockTransactionHistoryEntity: TransactionHistory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionHistoryRepository,
        {
          provide: DataSource,
          useValue: {
            createEntityManager: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<TransactionHistoryRepository>(
      TransactionHistoryRepository,
    );

    mockTransactionHistoryEntity = {
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
    };
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('createTransactionHistory', () => {
    it('should create transaction history', async () => {
      // setup mock
      const createTransactionHistoryDTO: CreateTransactionHistoryDto = pick(
        mockTransactionHistoryEntity,
        [
          'transaction_id',
          'customer_id',
          'partner_id',
          'is_cashback_applied',
          'cashback_amount',
          'transaction_amount',
          'transaction_quantity',
          'tier_reward_amount',
          'tier',
          'total_reward_amount',
        ],
      );
      const spy = jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockTransactionHistoryEntity);

      const result = await repository.createTransactionHistory(
        createTransactionHistoryDTO,
      );

      expect(result).toEqual(mockTransactionHistoryEntity);
      expect(spy).toBeCalled();
      expect(spy).toBeCalledWith(createTransactionHistoryDTO);
    });
  });

  describe('findTransactionHistoryByPartnerID', () => {
    it('should find transaction history by partner id', async () => {
      // setup mock

      const spy = jest
        .spyOn(repository, 'find')
        .mockResolvedValue([mockTransactionHistoryEntity]);

      // call method
      const result = await repository.findTransactionHistoryByPartnerID(
        new Date(),
        new Date(+5),
        mockTransactionHistoryEntity.partner_id,
      );

      // assert result
      expect(result).toEqual([mockTransactionHistoryEntity]);
      expect(spy).toBeCalled();
    });
  });
});
