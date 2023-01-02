import { Test, TestingModule } from '@nestjs/testing';
import { pick } from 'lodash';
import { CreateLoyaltyDto } from './dto/create-loyalty.dto';
import { UpdateLoyaltyDto } from './dto/update-loyalty.dto';
import { Loyalty } from './entities/loyalty.entity';
import { LoyaltyController } from './loyalty.controller';
import { LoyaltyService } from './loyalty.service';

describe('LoyaltyController', () => {
  let controller: LoyaltyController;
  let mockLoyaltyEntity: Loyalty;

  const mockLoyaltyService = {
    create: jest.fn(() => Promise.resolve(mockLoyaltyEntity)),
    findAll: jest.fn(() => Promise.resolve(mockLoyaltyEntity)),
    update: jest.fn(() => Promise.resolve(mockLoyaltyEntity)),
    getByCustomerID: jest.fn(() => Promise.resolve(mockLoyaltyEntity)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoyaltyController],
      providers: [{ provide: LoyaltyService, useValue: mockLoyaltyService }],
    }).compile();

    controller = module.get<LoyaltyController>(LoyaltyController);

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

      // execute the method
      const result = await controller.create(createDto);

      // assert the result
      expect(result).toEqual(mockLoyaltyEntity);
      expect(createLoyaltyOnSpy).toHaveBeenCalledTimes(1);
      expect(createLoyaltyOnSpy).toHaveBeenCalledWith(createDto);
    });
  });

  describe('Get By Customer Loyalty API', () => {
    it('should return a loyalty', async () => {
      // setup the mock
      const findAllLoyaltyOnSpy = jest
        .spyOn(mockLoyaltyService, 'getByCustomerID')
        .mockResolvedValue(mockLoyaltyEntity as Loyalty);

      // execute the method
      const result = await controller.getByCustomerID(
        '5f9f1c5b-7b1e-4b5c-8c1c-8c1c8c1c8c1c',
      );

      // assert the result
      expect(result).toEqual(mockLoyaltyEntity);
      expect(findAllLoyaltyOnSpy).toHaveBeenCalledTimes(1);
      expect(findAllLoyaltyOnSpy).toHaveBeenCalledWith(
        '5f9f1c5b-7b1e-4b5c-8c1c-8c1c8c1c8c1c',
      );
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

      // execute the method
      const result = await controller.update(updateDto);

      // assert the result
      expect(result).toEqual(mockLoyaltyEntity);
      expect(updateLoyaltyOnSpy).toHaveBeenCalledTimes(1);
      expect(updateLoyaltyOnSpy).toHaveBeenCalledWith(updateDto);
    });
  });
});
