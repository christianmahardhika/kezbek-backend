import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreatePromoDto } from './dto/create-promo.dto';
import { UpdatePromoDto } from './dto/update-promo.dto';
import { Promo } from './entities/promo.entity';
import { PromoRepository } from './repository/promo.repository';

@Injectable()
export class PromoService {
  constructor(private readonly repository: PromoRepository) {}
  async create(createPromoDto: CreatePromoDto): Promise<Promo> {
    try {
      return await this.repository.createPromo(createPromoDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private logger = new Logger('Promo Service');

  async findAll(): Promise<Promo[]> {
    try {
      return await this.repository.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(updatePromoDto: UpdatePromoDto): Promise<Promo> {
    try {
      return await this.repository.updatePromo(updatePromoDto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getCashBackPercentage(
    trans_quantity: number,
    trans_amount: number,
  ): Promise<number> {
    try {
      const data = await this.repository.findPromoByQuantityAndAmount(
        trans_quantity,
        trans_amount,
      );
      if (data.length === 0) {
        return 0;
      }
      return data;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
