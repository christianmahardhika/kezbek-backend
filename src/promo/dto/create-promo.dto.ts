export class CreatePromoDto {
  id: string;
  promo_id: string;
  partner_id: string;
  promo_code: string;
  is_active: boolean;
  promo_description: Text;
  promo_image: string;
  promo_terms: Text;
}
