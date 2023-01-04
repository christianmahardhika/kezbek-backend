import { Test, TestingModule } from '@nestjs/testing';
import { pick } from 'lodash';
import {
  SuccessCreateResponse,
  SuccessGetAllResponse,
} from './dto/base-response.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { FilterTransactionHistoryDto } from './dto/query-transaction.dto';
import { Transaction, TransactionHistory } from './entities/transaction.entity';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

describe('TransactionController', () => {
  let controller: TransactionController;
  let mockTransactionEntity: Transaction;
  let mockTransactionHistoryEntity: TransactionHistory;

  const mockTransactionService = {
    create: jest.fn(() => Promise.resolve(mockTransactionEntity)),
    submitTransaction: jest.fn(() => Promise.resolve(mockTransactionEntity)),
    findByDateAndPartnerID: jest.fn(() =>
      Promise.resolve(mockTransactionEntity),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        { provide: TransactionService, useValue: mockTransactionService },
      ],
    }).compile();

    controller = module.get<TransactionController>(TransactionController);

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

  afterEach = () => {
    jest.clearAllMocks();
  };

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create new transaction', () => {
    it('should return transaction entity', async () => {
      // setup mock
      const createTransactionDTO: CreateTransactionDto = pick(
        mockTransactionEntity,
        [
          'customer_id',
          'partner_id',
          'transaction_amount',
          'transaction_quantity',
        ],
      );

      const spy = jest
        .spyOn(mockTransactionService, 'create')
        .mockResolvedValue(mockTransactionEntity);

      const mockCreatedResponse = new SuccessCreateResponse(
        201,
        'Transaction created successfully',
        mockTransactionEntity,
      );

      // call controller
      const result = await controller.create(createTransactionDTO);

      // assert
      expect(result).toEqual(mockCreatedResponse);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(createTransactionDTO);
    });
  });

  describe('submit transaction', () => {
    it('should return transaction entity', async () => {
      // setup mock
      const submitTransactionDTO = pick(mockTransactionEntity, [
        'customer_id',
        'partner_id',
        'transaction_amount',
        'transaction_quantity',
      ]);

      const spy = jest
        .spyOn(mockTransactionService, 'submitTransaction')
        .mockResolvedValue(mockTransactionEntity);

      const mockCreatedResponse = new SuccessCreateResponse(
        202,
        'Cashback being processed',
        mockTransactionEntity,
      );

      // call controller
      const result = await controller.submitTransaction(submitTransactionDTO);

      // assert
      expect(result).toEqual(mockCreatedResponse);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(submitTransactionDTO);
    });
  });

  describe('get transaction by date and partner id', () => {
    it('should return transaction entity', async () => {
      // setup mock
      const mockFilterTransactionHistory: FilterTransactionHistoryDto = {
        partner_id: mockTransactionEntity.partner_id,
        start_date: new Date(),
        end_date: new Date(+5),
      };
      const spy = jest
        .spyOn(mockTransactionService, 'findByDateAndPartnerID')
        .mockResolvedValue(mockTransactionEntity);

      const mockCreatedResponse = new SuccessGetAllResponse(
        200,
        'Transaction found',
        mockTransactionEntity,
      );

      // call controller
      const result = await controller.findByDateAndPartnerID(
        mockFilterTransactionHistory.start_date,
        mockFilterTransactionHistory.end_date,
        mockFilterTransactionHistory.partner_id,
      );

      // assert
      expect(result).toEqual(mockCreatedResponse);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy).toHaveBeenCalledWith(
        mockFilterTransactionHistory.start_date,
        mockFilterTransactionHistory.end_date,
        mockFilterTransactionHistory.partner_id,
      );
    });
  });
});
