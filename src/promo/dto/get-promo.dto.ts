import { Timestamp } from 'typeorm';

class GetPromoDTO {
  id: string;
  promo_id: string;
  partner_id: string;
  promo_code: string;
  is_active: boolean;
  promo_description: Text;
  promo_image: string;
  promo_terms: Text;
  promo_start_date: Timestamp;
  promo_end_date: Timestamp;
  created_at: Timestamp;
  updated_at: Timestamp;
  deleted_at: Timestamp;
}
