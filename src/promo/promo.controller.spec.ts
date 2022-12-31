import { Test, TestingModule } from '@nestjs/testing';
import { PromoController } from './promo.controller';
import { PromoService } from './promo.service';

describe('PromoController', () => {
  let controller: PromoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PromoController],
      providers: [PromoService],
    }).compile();

    controller = module.get<PromoController>(PromoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
