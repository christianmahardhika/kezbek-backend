import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateLoyaltyDto } from './dto/create-loyalty.dto';
import { UpdateLoyaltyDto } from './dto/update-loyalty.dto';
import { Loyalty } from './entities/loyalty.entity';
import { LoyaltyRepository } from './repository/loyalty.repository';

@Injectable()
export class LoyaltyService {
  constructor(private readonly repository: LoyaltyRepository) {}
  async create(createLoyaltyDto: CreateLoyaltyDto): Promise<Loyalty> {
    try {
      return await this.repository.createLoyalty(createLoyaltyDto);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async update(updateLoyaltyDto: UpdateLoyaltyDto): Promise<Loyalty> {
    try {
      return await this.repository.updateLoyalty(updateLoyaltyDto);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async getByCustomerID(id: string): Promise<Loyalty> {
    try {
      return await this.repository.findLoyaltyByCustomerID(id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }
}
