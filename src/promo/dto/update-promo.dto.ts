import { PartialType } from '@nestjs/swagger';
import { Timestamp } from 'typeorm';
import { CreatePromoDto } from './create-promo.dto';

export class UpdatePromoDto extends PartialType(CreatePromoDto) {
  id: string;
  promo_id: string;
  partner_id: string;
  promo_code: string;
  is_active: boolean;
  promo_description: Text;
  promo_image: string;
  promo_terms: Text;
}
