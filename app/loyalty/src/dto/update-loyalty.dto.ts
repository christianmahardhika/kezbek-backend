import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsEmail } from 'class-validator';
import { CreateLoyaltyDto } from './create-loyalty.dto';

export class UpdateLoyaltyDto extends PartialType(CreateLoyaltyDto) {
  @ApiProperty({
    example: '5f9f1c5b-7b1e-4b5c-8c1c-8c1c8c1c8c1c',
    description: 'Loyalty ID',
  })
  id: string;
  @ApiProperty({ example: 'john.doe@test.com', description: 'customer email' })
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
  @IsBoolean({ message: 'Please enter a valid boolean' })
  is_point_send: boolean;
}
