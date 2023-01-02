import { Test, TestingModule } from '@nestjs/testing';
import { pick } from 'lodash';
import { Promo } from './entities/promo.entity';
import { PromoService } from './promo.service';
import { PromoRepository } from './repository/promo.repository';

describe('PromoService', () => {
  let service: PromoService;
  let mockPromoEntity: Promo;
  let mockPromoEntities: Promo[];

  const mockPromoRepository = {
    createPromo: jest.fn(() => Promise.resolve(mockPromoEntity)),
    updatePromo: jest.fn(() => Promise.resolve(mockPromoEntity)),
    findPromoByCode: jest.fn(() => Promise.resolve(mockPromoEntity)),
    findAll: jest.fn(() => Promise.resolve(mockPromoEntities)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PromoService,
        { provide: PromoRepository, useValue: mockPromoRepository },
      ],
    }).compile();

    service = module.get<PromoService>(PromoService);
    mockPromoEntity = {
      id: '76ce22c3-101b-4d8b-aba2-34df3d15e388',
      partner_id: 'qwer3-123123-123123-12312',
      promo_code: 'PROMO123',
      is_active: true,
      promo_description: 'This is a promo description',
      promo_image:
        'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
      promo_terms: 'This is a promo terms',
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
        promo_code: 'PROMO123',
        is_active: true,
        promo_description: 'This is a promo description',
        promo_image:
          'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
        promo_terms: 'This is a promo terms',
        promo_start_date: new Date(),
        promo_end_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
      {
        id: '76ce22c3-101b-4d8b-aba2-34df3d15e388',
        partner_id: 'qwer3-123123-123123-12312',
        promo_code: 'PROMO123',
        is_active: true,
        promo_description: 'This is a promo description',
        promo_image:
          'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
        promo_terms: 'This is a promo terms',
        promo_start_date: new Date(),
        promo_end_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null,
      },
    ];
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create New Promo', () => {
    it('should return new promo', async () => {
      // setup
      const createPromoDTO = pick(mockPromoEntity, [
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
        .spyOn(mockPromoRepository, 'createPromo')
        .mockResolvedValue(mockPromoEntity as Promo);

      // test the function
      const result = await service.create(createPromoDTO);
      expect(result).toEqual(mockPromoEntity);
      expect(createPromoOnSpy).toHaveBeenCalledTimes(1);
      expect(createPromoOnSpy).toHaveBeenCalledWith(createPromoDTO);
    });
  });

  describe('Update Promo', () => {
    it('should return updated promo', async () => {
      // setup
      const updatePromoDTO = pick(mockPromoEntity, [
        'id',
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
        .spyOn(mockPromoRepository, 'updatePromo')
        .mockResolvedValue(mockPromoEntity as Promo);

      // test the function
      const result = await service.update(updatePromoDTO);
      expect(result).toEqual(mockPromoEntity);
      expect(updatePromoOnSpy).toHaveBeenCalledTimes(1);
      expect(updatePromoOnSpy).toHaveBeenCalledWith(updatePromoDTO);
    });
  });

  describe('Find All Promo', () => {
    it('should return all promo', async () => {
      const findAllOnSpy = jest
        .spyOn(mockPromoRepository, 'findAll')
        .mockResolvedValue(mockPromoEntities as Promo[]);

      // test the function
      const result = await service.findAll();
      expect(result).toEqual(mockPromoEntities);
      expect(findAllOnSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Find Promo By Code', () => {
    it('should return promo by code', async () => {
      const findByPromoCodeOnSpy = jest
        .spyOn(mockPromoRepository, 'findPromoByCode')
        .mockResolvedValue(mockPromoEntity as Promo);
      // test the function
      const result = await service.getPromoCode('PROMO123');
      expect(result).toEqual(mockPromoEntity);
      expect(findByPromoCodeOnSpy).toHaveBeenCalledTimes(1);
      expect(findByPromoCodeOnSpy).toHaveBeenCalledWith('PROMO123');
    });
    it('should return null if promo code not found', async () => {
      const findByPromoCodeOnSpy = jest
        .spyOn(mockPromoRepository, 'findPromoByCode')
        .mockResolvedValue(null);
      // test the function
      const result = await service.getPromoCode('PROMO123');
      expect(result).toEqual(null);
      expect(findByPromoCodeOnSpy).toHaveBeenCalledTimes(1);
      expect(findByPromoCodeOnSpy).toHaveBeenCalledWith('PROMO123');
    });
  });
});
