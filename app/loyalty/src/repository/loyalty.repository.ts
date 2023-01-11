import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import {
  CreateLoyaltyDto,
  CreateLoyaltyRulesDto,
} from '../dto/create-loyalty.dto';
import { UpdateLoyaltyDto } from '../dto/update-loyalty.dto';
import { Loyalty, LoyaltyRules } from '../entities/loyalty.entity';

@Injectable()
export class LoyaltyRepository extends Repository<Loyalty> {
  constructor(private readonly dataSource: DataSource) {
    super(Loyalty, dataSource.createEntityManager());
  }

  async createLoyalty(createLoyaltyDto: CreateLoyaltyDto): Promise<Loyalty> {
    return await this.save(createLoyaltyDto);
  }

  async updateLoyalty(updateLoyaltyDto: UpdateLoyaltyDto): Promise<Loyalty> {
    return await this.save(updateLoyaltyDto);
  }

  async findLoyaltyByCustomerEmail(customer_email: string): Promise<Loyalty> {
    return this.findOne({ where: { customer_email } });
  }
}

@Injectable()
export class LoyaltyRulesRepository extends Repository<LoyaltyRules> {
  constructor(private readonly dataSource: DataSource) {
    super(LoyaltyRules, dataSource.createEntityManager());
  }

  createLoyaltyRules(
    createLoyaltyRulesDto: CreateLoyaltyRulesDto,
  ): Promise<LoyaltyRules> {
    return this.save(createLoyaltyRulesDto);
  }
  findAll(): Promise<LoyaltyRules[]> {
    return this.find();
  }
  findByTierAndMinTransactionApplied(
    loyalty_tier: number,
    min_transaction_applied: number,
  ): Promise<LoyaltyRules> {
    return this.findOne({ where: { loyalty_tier, min_transaction_applied } });
  }
}
