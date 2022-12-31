import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateTransactionDto } from './create-transaction.dto';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
  @ApiProperty({
    example: '5f9f1c5b-7b1e-4b5c-8c1c-8c1c8c1c8c1c',
    description: 'Transaction ID',
  })
  id: string;
  @ApiProperty({
    example: '5f9f1c5b-7b1e-4b5c-8c1c-8c1c8c1c8c1c',
    description: 'Customer ID',
  })
  customer_id: string;
  @ApiProperty({
    example: '5f9f1c5b-7b1e-4b5c-8c1c-8c1c8c1231c',
    description: 'Partner ID',
  })
  partner_id: string;
  @ApiProperty({ example: true, description: 'Is Cashback Applied' })
  is_cashback_applied: boolean;
  @ApiProperty({ example: 1000, description: 'Cashback Amount' })
  cashback_amount: Number;
  @ApiProperty({ example: 100000, description: 'Transaction Amount' })
  transaction_amount: Number;
  @ApiProperty({ example: 1, description: 'Transaction Quantity' })
  transaction_quantity: Number;
  @ApiProperty({ example: 1000, description: 'Tier Reward Amount' })
  tier_reward_amount: Number;
  @ApiProperty({ example: 1, description: 'Tier' })
  tier: Number;
  @ApiProperty({ example: 1000, description: 'Total Reward Amount' })
  total_reward_amount: Number;
}
