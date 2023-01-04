import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateTransactionDto {
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

export class CreateTransactionHistoryDto {
  @ApiProperty({
    example: '5f9f1c5b-7b1e-4b5c-8c1c-8c1c8c1c8c1c',
    description: 'Customer ID',
  })
  customer_id: string;
  @ApiProperty({
    example: '5f9f1c5b-7b1e-4b5c-8c1c-8c1c8c1231c',
    description: 'Partner ID',
  })
  transaction_id: string;
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

export class SubmitTransactionDto extends PartialType(CreateTransactionDto) {
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
  @ApiProperty({ example: 100000, description: 'Transaction Amount' })
  transaction_amount: Number;
  @ApiProperty({ example: 1, description: 'Transaction Quantity' })
  transaction_quantity: Number;
}

export class SubmitTransactionReturnDto {
  constructor(isSuceess: boolean, message: string, data: any) {
    this.isSuceess = isSuceess;
    this.message = message;
    this.data = data;
  }
  @ApiProperty({ example: true, description: 'Is Success' })
  isSuceess: boolean;
  @ApiProperty({
    example: 'cashback is being processed',
    description: 'Message',
  })
  message: string;
  @ApiProperty({
    example: '5f9f1c5b-7b1e-4b5c-8c1c-8c1c8c1c8c1c',
    description: 'Transaction ID',
  })
  data: any;
}