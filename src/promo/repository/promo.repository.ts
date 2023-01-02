import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreatePromoDto } from '../dto/create-promo.dto';
import { UpdatePromoDto } from '../dto/update-promo.dto';
import { Promo } from '../entities/promo.entity';

@Injectable()
export class PromoRepository extends Repository<Promo> {
  constructor(private readonly dataSource: DataSource) {
    super(Promo, dataSource.createEntityManager());
  }

  async createPromo(createPromoDto: CreatePromoDto): Promise<Promo> {
    return await this.save(createPromoDto);
  }

  async findPromoByCode(promo_code: string): Promise<Promo> {
    return this.findOne({ where: { promo_code } });
  }

  async updatePromo(updatePromoDto: UpdatePromoDto): Promise<Promo> {
    return await this.save(updatePromoDto);
  }


  async findAll(): Promise<Promo[]> {
    return await this.find();
  }
}
