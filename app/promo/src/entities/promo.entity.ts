import { ApiProperty } from '@nestjs/swagger';

export class Promo {
  @ApiProperty({
    example: '1dqwe2-123123-123123-123123',
    description: 'The uuid of the Promo',
  })
  id: string;
  @ApiProperty({
    example: '1dqwe2-123123-123123-123123',
    description: 'The uuid of the Partner',
  })
  partner_id: string;
  @ApiProperty({
    example: 'true',
    description: 'The status of the Promo',
  })
  is_active: boolean;
  @ApiProperty({
    example: 1,
    description: 'The minimum quantity of the Transaction',
  })
  min_quantity: number;
  @ApiProperty({
    example: 1000,
    description: 'The minimum transaction amount',
  })
  min_transaction_amount: number;
  @ApiProperty({
    example: 10000,
    description: 'The maximum transaction amount',
  })
  max_transaction_amount: number;
  @ApiProperty({
    example: 1.5,
    description: 'The cashback percentage',
  })
  cashback_percentage: number;
  @ApiProperty({
    example: '2021-01-01 00:00:00',
    description: 'The start date of the Promo',
  })
  promo_start_date: Date;
  @ApiProperty({
    example: '2021-01-02 00:00:00',
    description: 'The end date of the Promo',
  })
  promo_end_date: Date;
  @ApiProperty({
    example: '2021-01-01 00:00:00',
    description: 'The created date of the Promo',
  })
  created_at: Date;
  @ApiProperty({
    example: '2021-01-01 00:00:00',
    description: 'The updated date of the Promo',
  })
  updated_at: Date;
  @ApiProperty({
    example: '2021-01-01 00:00:00',
    description: 'The deleted date of the Promo',
  })
  deleted_at: Date;
}