import { ApiProperty } from '@nestjs/swagger';
import { CreateTransactionDto } from './create-transaction.dto';

export class LoyaltyDto {
  @ApiProperty({
    example: '5f9f1c5b-7b1e-4b5c-8c1c-8c1c8c1c8c1c',
    description: 'Loyalty ID',
  })
  id: string;
  @ApiProperty({ example: 'john.doe@test.com', description: 'customer email' })
  customer_email: string;
  @ApiProperty({ example: 'Gold', description: 'Tier Name' })
  current_tier_name: string;
  @ApiProperty({ example: 2, description: 'Tier Level' })
  current_tier: number;
  @ApiProperty({ example: 3, description: 'Next Tier Level' })
  next_tier: number;
  @ApiProperty({ example: 1, description: 'Last Tier Level' })
  previous_tier: number;
  @ApiProperty({
    example: false,
    description: 'is point has been send to customer',
  })
  is_point_send: boolean;
  @ApiProperty({ example: 7, description: 'Recuring Transaction' })
  reccuring_transaction: number;
  @ApiProperty({ example: '2020-10-10 10:10:10', description: 'Created At' })
  created_at: Date;
  @ApiProperty({ example: '2020-10-10 10:10:10', description: 'Updated At' })
  updated_at: Date;
  @ApiProperty({ example: '2020-10-10 10:10:10', description: 'Deleted At' })
  deleted_at: Date;

  upgradeTierReward(loyaltyDto: LoyaltyDto): LoyaltyDto {
    if (loyaltyDto.reccuring_transaction > 7 && loyaltyDto.next_tier > 3) {
      loyaltyDto.current_tier = loyaltyDto.next_tier;
      loyaltyDto.next_tier = loyaltyDto.next_tier + 1;
      loyaltyDto.reccuring_transaction = 1;
      loyaltyDto.updated_at = new Date();
      return loyaltyDto;
    }
    return loyaltyDto;
  }

  downgradeTierReward(
    loyaltyDto: LoyaltyDto,
    transactionDto: CreateTransactionDto,
  ): LoyaltyDto {
    const diff = Math.abs(
      new Date().getTime() - transactionDto.created_at.getTime(),
    );
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    if (diffDays > 30) {
      loyaltyDto.current_tier = loyaltyDto.next_tier;
      loyaltyDto.next_tier = loyaltyDto.next_tier - 1;
      loyaltyDto.reccuring_transaction = 1;
      loyaltyDto.updated_at = new Date();
      return loyaltyDto;
    }
    return loyaltyDto;
  }
}

export class LoyaltyRulesDto {
  @ApiProperty({
    example: '5f9f1c5b-7b1e-4b5c-8c1c-8c1c8c1c8c1c',
    description: 'Loyalty ID',
  })
  id: string;
  @ApiProperty({ example: 1, description: 'Tier Level' })
  loyalty_tier: number;
  @ApiProperty({ example: 100, description: 'Minimum Transaction' })
  min_transaction_applied: number;
  @ApiProperty({ example: 10000, description: 'Loyalty Point' })
  loyalty_point: number;
  @ApiProperty({ example: '2020-10-10 10:10:10', description: 'Created At' })
  created_at: Date;
  @ApiProperty({ example: '2020-10-10 10:10:10', description: 'Updated At' })
  updated_at: Date;
  @ApiProperty({ example: '2020-10-10 10:10:10', description: 'Deleted At' })
  deleted_at: Date;
}
