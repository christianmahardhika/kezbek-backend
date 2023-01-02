import { Test, TestingModule } from '@nestjs/testing';
import { pick } from 'lodash';
import { DataSource } from 'typeorm';
import { CreateLoyaltyDto } from '../dto/create-loyalty.dto';
import { Loyalty } from '../entities/loyalty.entity';
import { LoyaltyRepository } from './loyalty.repository';

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
      customer_id: '5f9f1c5b-7b1e-4b5c-8c1c-8c1c8c1c8c1c',
      current_tier_name: 'Gold',
      current_tier: 2,
      next_tier: 3,
      previous_tier: 1,
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

  describe('Get Loyalty By Customer ID', () => {
    it('should return a loyalty', async () => {
      // setup the mock
      const mockRepoMethods = jest
        .spyOn(repository, 'findOne')
        .mockResolvedValue(mockLoyaltyEntity as Loyalty);

      // call the method
      const result = await repository.findLoyaltyByCustomerID(
        mockLoyaltyEntity.customer_id,
      );

      // assert the result
      expect(result).toEqual(mockLoyaltyEntity);
      expect(mockRepoMethods).toBeCalled();
    });
  });

  describe('Update Loyalty', () => {
    it('should return a loyalty', async () => {
      // setup the mock
      const mockRepoMethods = jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockLoyaltyEntity as Loyalty);

      // call the method
      const result = await repository.updateLoyalty(mockLoyaltyEntity);

      // assert the result
      expect(result).toEqual(mockLoyaltyEntity);
      expect(mockRepoMethods).toBeCalled();
    });
  });
});
