import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

  async getPromoCode(promo_code: string): Promise<Promo> {
    try {
      return await this.repository.findPromoByCode(promo_code);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
