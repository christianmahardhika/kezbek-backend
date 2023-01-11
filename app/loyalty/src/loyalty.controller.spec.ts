import { Test, TestingModule } from '@nestjs/testing';
import { pick } from 'lodash';
import { SuccessCreateResponse } from './dto/base-response.dto';
import { CreateLoyaltyDto } from './dto/create-loyalty.dto';
import { GetLoyaltyRulesDto } from './dto/get-loyalty.dto';
import { UpdateLoyaltyDto } from './dto/update-loyalty.dto';
import { Loyalty, LoyaltyRules } from './entities/loyalty.entity';
import { LoyaltyController } from './loyalty.controller';
import { LoyaltyService } from './loyalty.service';

describe('LoyaltyController', () => {
  let controller: LoyaltyController;
  let mockLoyaltyEntity: Loyalty;
  let mockLoyaltyRulesEntity: LoyaltyRules;

  const mockLoyaltyService = {
    create: jest.fn(() => Promise.resolve(mockLoyaltyEntity)),
    update: jest.fn(() => Promise.resolve(mockLoyaltyEntity)),
    getByCustomerID: jest.fn(() => Promise.resolve(mockLoyaltyEntity)),
    getByCustomerEmail: jest.fn(() => Promise.resolve(mockLoyaltyEntity)),
    getAllLoyaltyRules: jest.fn(() => Promise.resolve(mockLoyaltyRulesEntity)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoyaltyController],
      providers: [{ provide: LoyaltyService, useValue: mockLoyaltyService }],
    }).compile();

    controller = module.get<LoyaltyController>(LoyaltyController);

    mockLoyaltyEntity = {
      id: '5f9f1c5b-7b1e-4b5c-8c1c-8c1c8c1c8c1c',
      customer_email: 'john.doe@test.com',
      current_tier_name: 'Gold',
      current_tier: 2,
      next_tier: 3,
      previous_tier: 1,
      is_point_send: false,
      reccuring_transaction: 1,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };
    mockLoyaltyRulesEntity = {
      id: '5f9f1c5b-7b1e-4b5c-8c1c-8c1c8c1c8c1c',
      loyalty_tier: 1,
      min_transaction_applied: 0,
      loyalty_point: 10,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create New Loyalty API', () => {
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
        .spyOn(mockLoyaltyService, 'create')
        .mockResolvedValue(mockLoyaltyEntity as Loyalty);

      const mockResponse = new SuccessCreateResponse(
        201,
        'Loyalty created successfully',
        mockLoyaltyEntity,
      );

      // execute the method
      const result = await controller.create(createDto);

      // assert the result
      expect(result).toEqual(mockResponse);
      expect(createLoyaltyOnSpy).toHaveBeenCalledTimes(1);
      expect(createLoyaltyOnSpy).toHaveBeenCalledWith(createDto);
    });
  });

  describe('Update Loyalty API', () => {
    it('should return a loyalty', async () => {
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
        .spyOn(mockLoyaltyService, 'update')
        .mockResolvedValue(mockLoyaltyEntity as Loyalty);

      const mockResponse = new SuccessCreateResponse(
        201,
        'Loyalty updated successfully',
        mockLoyaltyEntity,
      );

      // execute the method
      const result = await controller.update(updateDto);

      // assert the result
      expect(result).toEqual(mockResponse);
      expect(updateLoyaltyOnSpy).toHaveBeenCalledTimes(1);
      expect(updateLoyaltyOnSpy).toHaveBeenCalledWith(updateDto);
    });
  });

  describe('Find Loyalty By Customer Email', () => {
    it('should return a loyalty', async () => {
      // setup the mock
      const findAllLoyaltyOnSpy = jest
        .spyOn(mockLoyaltyService, 'getByCustomerEmail')
        .mockResolvedValue(mockLoyaltyEntity as Loyalty);

      // execute the method
      const result = await controller.checkTierReward(
        mockLoyaltyEntity.customer_email,
      );

      // assert the result
      expect(result).toEqual(mockLoyaltyEntity);
      expect(findAllLoyaltyOnSpy).toHaveBeenCalledTimes(1);
      expect(findAllLoyaltyOnSpy).toHaveBeenCalledWith(
        mockLoyaltyEntity.customer_email,
      );
    });
  });

  describe('Get All Loyalty Rules', () => {
    it('should return a loyalty', async () => {
      // setup the mock
      const findAllLoyaltyOnSpy = jest
        .spyOn(mockLoyaltyService, 'getAllLoyaltyRules')
        .mockResolvedValue(mockLoyaltyRulesEntity as LoyaltyRules);

      const data: GetLoyaltyRulesDto = {
        loyalty_tier: mockLoyaltyEntity.current_tier,
        min_transaction_applied: mockLoyaltyEntity.reccuring_transaction,
      };

      // execute the method
      const result = await controller.getAllLoyaltyRules(data);

      // assert the result
      expect(result).toEqual(mockLoyaltyRulesEntity);
      expect(findAllLoyaltyOnSpy).toHaveBeenCalledTimes(1);
      expect(findAllLoyaltyOnSpy).toHaveBeenCalledWith(data);
    });
  });
});
