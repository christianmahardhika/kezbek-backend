import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateLoyaltyDto } from './dto/create-loyalty.dto';
import { GetLoyaltyRulesDto } from './dto/get-loyalty.dto';
import { UpdateLoyaltyDto } from './dto/update-loyalty.dto';
import { Loyalty, LoyaltyRules } from './entities/loyalty.entity';
import {
  LoyaltyRepository,
  LoyaltyRulesRepository,
} from './repository/loyalty.repository';

@Injectable()
export class LoyaltyService {
  constructor(
    private readonly repository: LoyaltyRepository,
    private readonly repositoryLoyaltyRules: LoyaltyRulesRepository,
  ) {}
  private readonly logger = new Logger('Loyalty Service');
  async create(createLoyaltyDto: CreateLoyaltyDto): Promise<Loyalty> {
    try {
      return await this.repository.createLoyalty(createLoyaltyDto);
    } catch (error) {
      this.logger.error(`Error creating loyalty: ${error}`);
      throw new InternalServerErrorException(error);
    }
  }

  async update(updateLoyaltyDto: UpdateLoyaltyDto): Promise<Loyalty> {
    try {
      return await this.repository.updateLoyalty(updateLoyaltyDto);
    } catch (error) {
      this.logger.error(`Error updating loyalty: ${error}`);
      throw new InternalServerErrorException(error);
    }
  }

  async getByCustomerEmail(email: string): Promise<Loyalty> {
    try {
      return await this.repository.findLoyaltyByCustomerEmail(email);
    } catch (error) {
      this.logger.error(`Error getting loyalty by customer email: ${error}`);
      throw new InternalServerErrorException(error);
    }
  }

  async getAllLoyaltyRules(
    loyaltyRulesDto: GetLoyaltyRulesDto,
  ): Promise<LoyaltyRules> {
    try {
      return await this.repositoryLoyaltyRules.findByTierAndMinTransactionApplied(
        loyaltyRulesDto.loyalty_tier,
        loyaltyRulesDto.min_transaction_applied,
      );
    } catch (error) {
      this.logger.error(
        `Error getting loyalty point by transaction applied: ${error}`,
      );
      throw new InternalServerErrorException(error);
    }
  }
}
