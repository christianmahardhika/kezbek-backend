import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDecimal, IsInt, Min } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({ example: 'john.doe@test.com', description: 'customer email' })
  customer_email: string;
  @ApiProperty({
    example: '90133023-1b6d-4c4d-9379-64263283dcbb',
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
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export class SubmitTransactionDto extends PartialType(CreateTransactionDto) {
  @ApiProperty({ example: 'john.doe@test.com', description: 'customer email' })
  customer_email: string;
  @ApiProperty({
    example: '7096dabb-8cc2-4e3b-bf63-127ea2678d48',
    description: 'Partner ID',
  })
  partner_id: string;
  @ApiProperty({ example: '+628112345768', description: 'customer msisdn' })
  customer_msisdn: string;
  @ApiProperty({ example: 'linkAja', description: 'payment provider' })
  payment_provider: string;
  @ApiProperty({ example: 100000, description: 'Transaction Amount' })
  @IsDecimal({ message: 'Transaction Amount must be a decimal' })
  @Min(1, { message: 'Transaction Amount must be greater than 0' })
  transaction_amount: number;
  @ApiProperty({ example: 1, description: 'Transaction Quantity' })
  @Min(1, { message: 'Transaction Amount must be greater than 0' })
  @IsInt({ message: 'Transaction Amount must be a number' })
  transaction_quantity: number;
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
