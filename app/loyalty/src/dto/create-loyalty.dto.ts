import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt } from 'class-validator';

export class CreateLoyaltyDto {
  @ApiProperty({
    example: 'john.doe@test.com',
    description: 'customer email',
  })
  @IsEmail({}, { message: 'Please enter a valid email' })
  customer_email: string;
  @ApiProperty({ example: 'Gold', description: 'Tier Name' })
  current_tier_name: string;
  @ApiProperty({ example: 2, description: 'Tier Level' })
  current_tier: number;
  @ApiProperty({ example: 2, description: 'Next Tier Level' })
  next_tier: number;
  @ApiProperty({ example: 1, description: 'Last Tier Level' })
  previous_tier: number;
  @ApiProperty({
    example: false,
    description: 'is point has been send to customer',
  })
  is_point_send: boolean;
}

export class CreateLoyaltyRulesDto {
  @ApiProperty({
    example: 1,
    description: 'Tier Level',
  })
  @IsInt({ message: 'Please enter a valid integer' })
  loyalty_tier: number;
  @ApiProperty({
    example: 100,
    description: 'Minimum Transaction',
  })
  @IsInt({ message: 'Please enter a valid integer' })
  min_transaction_applied: number;
  @ApiProperty({
    example: 10000,
    description: 'Maximum Transaction',
  })
  loyalty_point: number;
}
