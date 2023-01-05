import { ApiProperty } from '@nestjs/swagger';

export class Transaction {
  @ApiProperty({
    example: '5f9f1c5b-7b1e-4b5c-8c1c-8c1c8c1c8c1c',
    description: 'Transaction ID',
  })
  id: string;
  @ApiProperty({
    example: 'john.doe@test.com',
    description: 'Customer Email',
  })
  customer_email: string;
  @ApiProperty({
    example: '5f9f1c5b-7b1e-4b5c-8c1c-8c1c8c1231c',
    description: 'Partner ID',
  })
  partner_id: string;
  @ApiProperty({ example: true, description: 'Is Cashback Applied' })
  is_cashback_applied: boolean;
  @ApiProperty({ example: 1000, description: 'Cashback Amount' })
  cashback_amount: number;
  @ApiProperty({ example: 100000, description: 'Transaction Amount' })
  transaction_amount: number;
  @ApiProperty({ example: 1, description: 'Transaction Quantity' })
  transaction_quantity: number;
  @ApiProperty({ example: 1000, description: 'Tier Reward Amount' })
  tier_reward_amount: number;
  @ApiProperty({ example: 1, description: 'Tier' })
  tier: number;
  @ApiProperty({ example: 1000, description: 'Total Reward Amount' })
  total_reward_amount: number;
  @ApiProperty({ example: new Date(), description: 'Created At' })
  created_at: Date;
  @ApiProperty({ example: new Date(), description: 'Updated At' })
  updated_at: Date;
  @ApiProperty({ example: new Date(), description: 'Deleted At' })
  deleted_at: Date;
}
