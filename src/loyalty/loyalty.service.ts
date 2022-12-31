import { Injectable } from '@nestjs/common';
import { CreateLoyaltyDto } from './dto/create-loyalty.dto';
import { UpdateLoyaltyDto } from './dto/update-loyalty.dto';

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

  getByCustomerID(id: string) {
    return `This action returns a #${id} loyalty`;
  }
}
