import { Injectable } from '@nestjs/common';
import { CreateLoyaltyDto } from './dto/create-loyalty.dto';
import { UpdateLoyaltyDto } from './dto/update-loyalty.dto';
import { Loyalty } from './entities/loyalty.entity';

@Injectable()
export class LoyaltyService {
  create(createLoyaltyDto: CreateLoyaltyDto) {
    return 'This action adds a new loyalty';
  }

  findAll() {
    return `This action returns all loyalty`;
  }

  findOne(id: number) {
    return `This action returns a #${id} loyalty`;
  }

  update(id: number, updateLoyaltyDto: UpdateLoyaltyDto) {
    return `This action updates a #${id} loyalty`;
  }

  remove(id: number) {
    return `This action removes a #${id} loyalty`;
  }

  getByCustomerID(id: string): Loyalty {
    return {
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
  }
}
