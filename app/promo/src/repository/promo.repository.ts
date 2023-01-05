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

  async findPromoByQuantityAndAmount(
    trans_quantity: number,
    trans_amount: number,
  ): Promise<number> {
    return this.query(
      `SELECT cashback_percentage FROM promo WHERE min_quantity <= ${trans_quantity} AND (min_transaction_amount <= ${trans_amount} and max_transaction_amount <= ${trans_amount}) AND is_active = true AND (start_date <= NOW() AND end_date <= NOW()) AND deleted_at IS NULL`,
    );
  }

  async updatePromo(updatePromoDto: UpdatePromoDto): Promise<Promo> {
    return await this.save(updatePromoDto);
  }

  async findAll(): Promise<Promo[]> {
    return await this.find();
  }
}
