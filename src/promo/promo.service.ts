import { Injectable } from '@nestjs/common';
import { CreatePromoDto } from './dto/create-promo.dto';
import { UpdatePromoDto } from './dto/update-promo.dto';
import { Promo } from './entities/promo.entity';

@Injectable()
export class PromoService {
  create(createPromoDto: CreatePromoDto): Promo {
    return {
      id: createPromoDto.id,
      promo_id: createPromoDto.promo_id,
      partner_id: createPromoDto.partner_id,
      promo_code: createPromoDto.promo_code,
      is_active: createPromoDto.is_active,
      promo_description: createPromoDto.promo_description,
      promo_image: createPromoDto.promo_image,
      promo_terms: createPromoDto.promo_terms,
      promo_start_date: createPromoDto.promo_start_date,
      promo_end_date: createPromoDto.promo_end_date,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: new Date(),
    };
  }

  findAll(): Promo[] {
    return [
      {
        id: 'KDQW9-123123-123123-123123',
        promo_id: 'qwer3-123123-123123-123123',
        partner_id: 'qwer3-123123-123123-123123',
        promo_code: 'PROMO123',
        is_active: true,
        promo_description: 'This is a promo description',
        promo_image:
          'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
        promo_terms: 'This is a promo terms',
        promo_start_date: new Date(),
        promo_end_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date(),
      },
      {
        id: 'KDQW9-123123-123123-123123',
        promo_id: 'qwer3-123123-123123-123123',
        partner_id: 'qwer3-123123-123123-123123',
        promo_code: 'PROMO123',
        is_active: true,
        promo_description: 'This is a promo description',
        promo_image:
          'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
        promo_terms: 'This is a promo terms',
        promo_start_date: new Date(),
        promo_end_date: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date(),
      },
    ];
  }

  findOne(id: string): Promo {
    return {
      id: id,
      promo_id: 'qwer3-123123-123123-123123',
      partner_id: 'qwer3-123123-123123-123123',
      promo_code: 'PROMO123',
      is_active: true,
      promo_description: 'This is a promo description',
      promo_image:
        'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
      promo_terms: 'This is a promo terms',
      promo_start_date: new Date(),
      promo_end_date: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };
  }

  update(id: number, updatePromoDto: UpdatePromoDto): Promo {
    return {
      id: updatePromoDto.id,
      promo_id: updatePromoDto.promo_id,
      partner_id: updatePromoDto.partner_id,
      promo_code: updatePromoDto.promo_code,
      is_active: updatePromoDto.is_active,
      promo_description: updatePromoDto.promo_description,
      promo_image: updatePromoDto.promo_image,
      promo_terms: updatePromoDto.promo_terms,
      promo_start_date: updatePromoDto.promo_start_date,
      promo_end_date: updatePromoDto.promo_end_date,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} promo`;
  }

  getPromoCode(promo_code: string): Promo {
    return {
      id: 'KDQW9-123123-123123-123123',
      promo_id: promo_code,
      partner_id: 'qwer3-123123-123123-123123',
      promo_code: 'PROMO123',
      is_active: true,
      promo_description: 'This is a promo description',
      promo_image:
        'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
      promo_terms: 'This is a promo terms',
      promo_start_date: new Date(),
      promo_end_date: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: new Date(),
    };
  }
}
