import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateLoyaltyDto } from '../dto/create-loyalty.dto';
import { UpdateLoyaltyDto } from '../dto/update-loyalty.dto';
import { Loyalty } from '../entities/loyalty.entity';

@Injectable()
export class LoyaltyRepository extends Repository<Loyalty> {
  constructor(private readonly dataSource: DataSource) {
    super(Loyalty, dataSource.createEntityManager());
  }

  async createLoyalty(createLoyaltyDto: CreateLoyaltyDto): Promise<Loyalty> {
    return await this.save(createLoyaltyDto);
  }

  async findLoyaltyByCustomerID(customer_id: string): Promise<Loyalty> {
    return this.findOne({ where: { customer_id } });
  }

  async updateLoyalty(updateLoyaltyDto: UpdateLoyaltyDto): Promise<Loyalty> {
    return await this.save(updateLoyaltyDto);
  }
}
