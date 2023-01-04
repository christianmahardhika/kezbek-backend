import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsString,
  IsUrl,
  IsUUID,
} from 'class-validator';
import { CreatePromoDto } from './create-promo.dto';

export class UpdatePromoDto extends PartialType(CreatePromoDto) {
  @ApiProperty({
    example: '1dqwe2-123123-123123-123123',
    description: 'The uuid of the Promo',
  })
  @IsUUID()
  id: string;
  @ApiProperty({
    example: '1dqwe2-123123-123123-123123',
    description: 'The uuid of the Promo',
  })
  @IsString()
  promo_id: string;
  @ApiProperty({
    example: '1dqwe2-123123-123123-123123',
    description: 'The uuid of the Partner',
  })
  @IsUUID()
  partner_id: string;
  @ApiProperty({
    example: 'PROMO123',
    description: 'The code of the Promo',
  })
  @IsString()
  promo_code: string;
  @ApiProperty({
    example: 'true',
    description: 'The status of the Promo',
  })
  @IsBoolean()
  is_active: boolean;
  @ApiProperty({
    example: 'This is a promo description',
    description: 'The description of the Promo',
  })
  @IsString()
  promo_description: string;
  @ApiProperty({
    example:
      'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
    description: 'The image of the Promo',
  })
  @IsUrl()
  promo_image: string;
  @ApiProperty({
    example: 'This is a promo terms',
    description: 'The terms of the Promo',
  })
  @IsString()
  promo_terms: string;
  @ApiProperty({
    example: '2021-01-01 00:00:00',
    description: 'The start date of the Promo',
  })
  @IsDateString()
  promo_start_date: Date;
  @ApiProperty({
    example: '2021-01-02 00:00:00',
    description: 'The end date of the Promo',
  })
  @IsDateString()
  promo_end_date: Date;
}
