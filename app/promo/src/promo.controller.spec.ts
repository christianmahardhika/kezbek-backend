import { Test, TestingModule } from '@nestjs/testing';
import { pick } from 'lodash';
import {
  SuccessCreateResponse,
  SuccessGetAllResponse,
} from './dto/base-response.dto';
import { Promo } from './entities/promo.entity';
import { PromoController } from './promo.controller';
import { PromoService } from './promo.service';

describe('PromoController', () => {
  let controller: PromoController;
  let mockPromoEntity: Promo;
  let mockPromoEntities: Promo[];

  const mockPromoService = {
    create: jest.fn(() => Promise.resolve(mockPromoEntity)),
    update: jest.fn(() => Promise.resolve(mockPromoEntity)),
    getPromoCode: jest.fn(() => Promise.resolve(mockPromoEntity)),
    findAll: jest.fn(() => Promise.resolve(mockPromoEntities)),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PromoController],
      providers: [{ provide: PromoService, useValue: mockPromoService }],
    }).compile();

    controller = module.get<PromoController>(PromoController);

    mockPromoEntity = {
      id: '76ce22c3-101b-4d8b-aba2-34df3d15e388',
      partner_id: 'qwer3-123123-123123-12312',
      is_active: true,
      min_quantity: 1,
      min_transaction_amount: 10,
      max_transaction_amount: 100,
      cashback_percentage: 10,
      promo_start_date: new Date(),
      promo_end_date: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };
    mockPromoEntities = [
      {
        id: '76ce22c3-101b-4d8b-aba2-34df3d15e388',
        partner_id: 'qwer3-123123-123123-12312',
        is_active: true,
        min_quantity: 1,
        min_transaction_amount: 10,
        max_transaction_amount: 100,
        cashback_percentage: 10,
        promo_start_date: new Date(),
        promo_end_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        id: '76ce22c3-101b-4d8b-aba2-34df3d15e388',
        partner_id: 'qwer3-123123-123123-12312',
        is_active: true,
        min_quantity: 1,
        min_transaction_amount: 10,
        max_transaction_amount: 100,
        cashback_percentage: 10,
        promo_start_date: new Date(),
        promo_end_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
    ];
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Create Promo API', () => {
    it('should return a promo entity', async () => {
      const createDto = pick(mockPromoEntity, [
        'partner_id',
        'promo_code',
        'is_active',
        'promo_description',
        'promo_image',
        'promo_terms',
        'promo_start_date',
        'promo_end_date',
      ]);
      const createPromoOnSpy = jest
        .spyOn(mockPromoService, 'create')
        .mockResolvedValue(mockPromoEntity as Promo);
      const mockCreatedResponse = new SuccessCreateResponse(
        201,
        'Promo created successfully',
        mockPromoEntity,
      );
      const result = await controller.create(createDto);

      expect(result).toEqual(mockCreatedResponse);
      expect(createPromoOnSpy).toHaveBeenCalledTimes(1);
      expect(createPromoOnSpy).toHaveBeenCalledWith(createDto);
    });
  });

  describe('Update Promo API', () => {
    it('should return a promo entity', async () => {
      const updateDto = pick(mockPromoEntity, [
        'partner_id',
        'promo_code',
        'is_active',
        'promo_description',
        'promo_image',
        'promo_terms',
        'promo_start_date',
        'promo_end_date',
      ]);
      const updatePromoOnSpy = jest
        .spyOn(mockPromoService, 'update')
        .mockResolvedValue(mockPromoEntity as Promo);
      const mockUpdatedResponse = new SuccessCreateResponse(
        201,
        `Success update new record id ${mockPromoEntity.id}`,
        mockPromoEntity,
      );
      const result = await controller.update(updateDto);

      expect(result).toEqual(mockUpdatedResponse);
      expect(updatePromoOnSpy).toHaveBeenCalledTimes(1);
      expect(updatePromoOnSpy).toHaveBeenCalledWith(updateDto);
    });
  });

  describe('Get All Promo API', () => {
    it('should return a promo entity', async () => {
      const getAllPromoOnSpy = jest
        .spyOn(mockPromoService, 'findAll')
        .mockResolvedValue(mockPromoEntities as Promo[]);
      const mockGetAllPromoResponse = new SuccessGetAllResponse(
        200,
        'Promo retrieved successfully',
        mockPromoEntities,
      );
      const result = await controller.findAll();

      expect(result).toEqual(mockGetAllPromoResponse);
      expect(getAllPromoOnSpy).toHaveBeenCalledTimes(1);
      expect(getAllPromoOnSpy).toHaveBeenCalled();
    });
  });
});
