import { Test, TestingModule } from '@nestjs/testing';
import { pick } from 'lodash';
import { DataSource } from 'typeorm';
import { CreateLoyaltyDto } from '../dto/create-loyalty.dto';
import { Loyalty, LoyaltyRules } from '../entities/loyalty.entity';
import {
  LoyaltyRepository,
  LoyaltyRulesRepository,
} from './loyalty.repository';

describe('LoyaltyRepository', () => {
  let repository: LoyaltyRepository;
  let mockLoyaltyEntity: Loyalty;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoyaltyRepository,
        { provide: DataSource, useValue: { createEntityManager: jest.fn() } },
      ],
    }).compile();

    repository = module.get<LoyaltyRepository>(LoyaltyRepository);
    dataSource = module.get<DataSource>(DataSource);
    mockLoyaltyEntity = {
      id: '5f9f1c5b-7b1e-4b5c-8c1c-8c1c8c1c8c1c',
      customer_email: 'john.doe@test.com',
      current_tier_name: 'Gold',
      current_tier: 2,
      next_tier: 3,
      previous_tier: 1,
      reccuring_transaction: 1,
      is_point_send: false,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('Create New Loyalty', () => {
    it('should return a loyalty', async () => {
      // setup the mock
      const createDto: CreateLoyaltyDto = pick(mockLoyaltyEntity, [
        'customer_id',
        'current_tier_name',
        'current_tier',
        'next_tier',
        'previous_tier',
        'loyalty_point',
      ]);

      const mockRepoMethods = jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockLoyaltyEntity as Loyalty);

      // call the method
      const result = await repository.createLoyalty(createDto);

      // assert the result
      expect(result).toEqual(mockLoyaltyEntity);
      expect(mockRepoMethods).toBeCalled();
    });
  });

  describe('Update Loyalty', () => {
    it('should return a loyalty', async () => {
      // setup the mock
      const mockUpdateDto = pick(mockLoyaltyEntity, [
        'current_tier_name',
        'current_tier',
        'next_tier',
        'previous_tier',
        'loyalty_point',
      ]);
      const mockRepoMethods = jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockLoyaltyEntity as Loyalty);

      // call the method
      const result = await repository.updateLoyalty(mockUpdateDto);

      // assert the result
      expect(result).toEqual(mockLoyaltyEntity);
      expect(mockRepoMethods).toBeCalled();
    });
  });

  describe('Find By Customer Email', () => {
    it('should return a loyalty', async () => {
      // setup the mock
      const mockRepoMethods = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockLoyaltyEntity as Loyalty);

      // call the method
      const result = await repository.findLoyaltyByCustomerEmail(
        mockLoyaltyEntity.customer_email,
      );

      // assert the result
      expect(result).toEqual(mockLoyaltyEntity);
      expect(mockRepoMethods).toBeCalled();
    });
  });
});

describe('LoyaltyRulesRepository', () => {
  let repository: LoyaltyRulesRepository;
  let mockLoyaltyRulesEntity: LoyaltyRules;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoyaltyRulesRepository,
        { provide: DataSource, useValue: { createEntityManager: jest.fn() } },
      ],
    }).compile();

    repository = module.get<LoyaltyRulesRepository>(LoyaltyRulesRepository);
    dataSource = module.get<DataSource>(DataSource);
    mockLoyaltyRulesEntity = {
      id: '5f9f1c5b-7b1e-4b5c-8c1c-8c1c8c1c8c1c',
      loyalty_tier: 1,
      min_transaction_applied: 1,
      loyalty_point: 100,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('Find All Loyalty Rules', () => {
    it('should return a list of loyalty rules', async () => {
      // setup the mock
      const mockRepoMethods = jest
        .spyOn(repository, 'find')
        .mockResolvedValue([mockLoyaltyRulesEntity] as LoyaltyRules[]);

      // call the method
      const result = await repository.findAll();

      // assert the result
      expect(result).toEqual([mockLoyaltyRulesEntity]);
      expect(mockRepoMethods).toBeCalled();
    });
  });

  describe('Find Loyalty Rules By Tier and Min Transaction Applied', () => {
    it('should return a loyalty rules', async () => {
      // setup the mock
      const mockRepoMethods = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockLoyaltyRulesEntity as LoyaltyRules);

      // call the method
      const result = await repository.findByTierAndMinTransactionApplied(
        mockLoyaltyRulesEntity.loyalty_tier,
        mockLoyaltyRulesEntity.min_transaction_applied,
      );

      // assert the result
      expect(result).toEqual(mockLoyaltyRulesEntity);
      expect(mockRepoMethods).toBeCalled();
    });
  });
});
