import { HttpService } from '@nestjs/axios';
import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { CashBackDto } from 'src/dto/cashback.dto';
import { LoyaltyDto } from 'src/dto/loyalty.dto';
import { mock } from '../__utils';
import { TransactionProvider } from './transaction.provider';

describe('TransactionProvider', () => {
  let provider: TransactionProvider;
  let loyaltyDto: LoyaltyDto;
  let cashbackDto: CashBackDto;

  const simulationClientMock = mock<ClientProxy>('connect', 'send', 'emit');

  const simulationHttpMock = mock<HttpService>('post');

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionProvider,
        {
          provide: 'PROMO_SERVICE',
          useValue: simulationClientMock,
        },
        {
          provide: 'LOYALTY_SERVICE',
          useValue: simulationClientMock,
        },
        {
          provide: 'NOTIFICATION_SERVICE',
          useValue: simulationClientMock,
        },
        {
          provide: HttpService,
          useValue: simulationHttpMock,
        },
      ],
    }).compile();

    provider = module.get<TransactionProvider>(TransactionProvider);

    loyaltyDto = {
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

    cashbackDto = {
      trans_quantity: 1,
      trans_amount: 100000,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  describe('checkTierByCustomerEmail', () => {
    it('should return data', async () => {
      // Arrange

      const mqSpy = jest
        .spyOn(simulationClientMock, 'send')
        .mockReturnValue(of(loyaltyDto));

      // Act
      const result = await provider.checkTierByCustomerEmail(
        loyaltyDto.customer_email,
      );

      // Assert
      expect(result).toEqual(loyaltyDto);
      expect(mqSpy).toBeCalled();
    });
  });

  describe('get cashback ', () => {
    it('should return data', async () => {
      // Arrange
      const resultCashback = 1.5;
      const mqSpy = jest
        .spyOn(simulationClientMock, 'send')
        .mockReturnValue(of(resultCashback));

      // Act
      const result = await provider.getCashback(
        cashbackDto.trans_quantity,
        cashbackDto.trans_amount,
      );

      // Assert
      expect(result).toEqual(resultCashback);
      expect(mqSpy).toBeCalled();
    });
  });

  describe('get reward ', () => {
    it('should return data', async () => {
      // Arrange
      const resultReward = 1.5;
      const mqSpy = jest
        .spyOn(simulationClientMock, 'send')
        .mockReturnValue(of(resultReward));

      // Act
      const result = await provider.getReward(
        loyaltyDto.current_tier,
        loyaltyDto.reccuring_transaction,
      );

      // Assert
      expect(result).toEqual(resultReward);
      expect(mqSpy).toBeCalled();
    });
  });
});
