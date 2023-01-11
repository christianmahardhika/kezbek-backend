import { Test, TestingModule } from '@nestjs/testing';
import { pick } from 'loadsh';
import { DataSource } from 'typeorm';
import { Promo } from '../entities/promo.entity';
import { PromoRepository } from './promo.repository';

describe('PromoRepository', () => {
  let repository: PromoRepository;
  let mockPromoEntity: Promo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PromoRepository,
        {
          provide: DataSource,
          useValue: {
            createEntityManager: jest.fn(),
          },
        },
      ],
    }).compile();
    repository = module.get<PromoRepository>(PromoRepository);
    mockPromoEntity = {
      id: '76ce22c3-101b-4d8b-aba2-34df3d15e388',
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
  });
  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('Create New Promo', () => {
    it('should return new promo', async () => {
      // setup
      const createPromoDTO = pick(mockPromoEntity, [
        'promo_code',
        'is_active',
        'promo_description',
        'promo_image',
        'promo_terms',
        'promo_start_date',
        'promo_end_date',
      ]);

      const mockRepoMethods = jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockPromoEntity as Promo);

      // test the function
      const result = await repository.createPromo(createPromoDTO);

      // assert
      expect(result).toEqual(mockPromoEntity);
      expect(mockRepoMethods).toBeCalled();
    });
  });

  describe('Find All Promo', () => {
    it('should return all promo', async () => {
      // setup
      const mockRepoMethods = jest
        .spyOn(repository, 'find')
        .mockResolvedValue([mockPromoEntity]);

      // test the function
      const result = await repository.findAll();

      // assert
      expect(result).toEqual([mockPromoEntity]);
      expect(mockRepoMethods).toBeCalled();
    });
  });

  describe('Update Promo', () => {
    it('should return updated promo', async () => {
      // setup
      const updatePromoDTO = pick(mockPromoEntity, [
        'promo_code',
        'is_active',
        'promo_description',
        'promo_image',
        'promo_terms',
        'promo_start_date',
        'promo_end_date',
      ]);

      const mockRepoMethods = jest
        .spyOn(repository, 'save')
        .mockResolvedValue(mockPromoEntity as Promo);

      // test the function
      const result = await repository.updatePromo(updatePromoDTO);

      // assert
      expect(result).toEqual(mockPromoEntity);
      expect(mockRepoMethods).toBeCalled();
    });
  });

  describe('Find Promo by quantity and amount', () => {
    it('should return number', async () => {
      // setup

      const mockRepoMethods = jest
        .spyOn(repository, 'query')
        .mockResolvedValue(10);

      // test the function
      const result = await repository.findPromoByQuantityAndAmount(1, 100);

      // assert
      expect(result).toEqual(10);
      expect(mockRepoMethods).toBeCalled();
    });
  });
});
