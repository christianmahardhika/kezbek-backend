import { Test, TestingModule } from '@nestjs/testing';
import { pick } from 'lodash';
import { CreateLoyaltyDto } from './dto/create-loyalty.dto';
import { UpdateLoyaltyDto } from './dto/update-loyalty.dto';
import { Loyalty } from './entities/loyalty.entity';
import { LoyaltyService } from './loyalty.service';
import { LoyaltyRepository } from './repository/loyalty.repository';

describe('LoyaltyService', () => {
  let service: LoyaltyService;
  let mockLoyaltyEntity: Loyalty;

  const mockLoyaltyRepository = {
    createLoyalty: jest.fn(() => Promise.resolve(mockLoyaltyEntity)),
    updateLoyalty: jest.fn(() => Promise.resolve(mockLoyaltyEntity)),
    findLoyaltyByCustomerID: jest.fn(() => Promise.resolve(mockLoyaltyEntity)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoyaltyService,
        { provide: LoyaltyRepository, useValue: mockLoyaltyRepository },
      ],
    }).compile();

    service = module.get<LoyaltyService>(LoyaltyService);

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
    expect(service).toBeDefined();
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

      const createLoyaltyOnSpy = jest
        .spyOn(mockLoyaltyRepository, 'createLoyalty')
        .mockResolvedValue(mockLoyaltyEntity as Loyalty);

      // call method
      const result = await service.create(createDto);

      // assert result
      expect(result).toEqual(mockLoyaltyEntity);
      expect(createLoyaltyOnSpy).toHaveBeenCalledTimes(1);
      expect(createLoyaltyOnSpy).toHaveBeenCalledWith(createDto);
    });
  });

  describe('Update Loyalty', () => {
    it('should return updated loyalty', async () => {
      // setup the mock
      const updateDto: UpdateLoyaltyDto = pick(mockLoyaltyEntity, [
        'id',
        'customer_id',
        'current_tier_name',
        'current_tier',
        'next_tier',
        'previous_tier',
        'loyalty_point',
      ]);

      const updateLoyaltyOnSpy = jest
        .spyOn(mockLoyaltyRepository, 'updateLoyalty')
        .mockResolvedValue(mockLoyaltyEntity as Loyalty);

      // call method
      const result = await service.update(updateDto);

      // assert result
      expect(result).toEqual(mockLoyaltyEntity);
      expect(updateLoyaltyOnSpy).toHaveBeenCalledTimes(1);
      expect(updateLoyaltyOnSpy).toHaveBeenCalledWith(updateDto);
    });
  });

  describe('Find Loyalty By Customer ID', () => {
    it('should return a loyalty', async () => {
      // setup the mock
      const customer_id = mockLoyaltyEntity.customer_id;

      const findLoyaltyByCustomerIDOnSpy = jest
        .spyOn(mockLoyaltyRepository, 'findLoyaltyByCustomerID')
        .mockResolvedValue(mockLoyaltyEntity as Loyalty);

      // call method
      const result = await service.getByCustomerID(customer_id);

      // assert result
      expect(result).toEqual(mockLoyaltyEntity);
      expect(findLoyaltyByCustomerIDOnSpy).toHaveBeenCalledTimes(1);
      expect(findLoyaltyByCustomerIDOnSpy).toHaveBeenCalledWith(customer_id);
    });
  });
});
