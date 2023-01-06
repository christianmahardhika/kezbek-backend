import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreatePromoDto } from '../dto/create-promo.dto';
import { UpdatePromoDto } from '../dto/update-promo.dto';
import { Promo } from '../entities/promo.entity';

@Injectable()
export class PromoRepository extends Repository<Promo> {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    super(Promo, dataSource.createEntityManager());
  }

  async createPromo(createPromoDto: CreatePromoDto): Promise<Promo> {
    return await this.save(createPromoDto);
  }

  async findPromoByQuantityAndAmount(
    trans_quantity: number,
    trans_amount: number,
  ): Promise<any> {
    const query = `SELECT cashback_percentage FROM promo WHERE min_quantity <= ${trans_quantity} AND (min_transaction_amount <= ${trans_amount} and max_transaction_amount >= ${trans_amount}) AND is_active = true AND (promo_start_date <= NOW() AND promo_end_date >= NOW()) AND deleted_at IS NULL;`;
    return await this.query(query);
  }

  async updatePromo(updatePromoDto: UpdatePromoDto): Promise<Promo> {
    return await this.save(updatePromoDto);
  }

  async findAll(): Promise<Promo[]> {
    return await this.find();
  }
}
