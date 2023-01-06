import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Loyalty {
  @ApiProperty({
    example: '5f9f1c5b-7b1e-4b5c-8c1c-8c1c8c1c8c1c',
    description: 'Loyalty ID',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiProperty({ example: 'john.doe@test.com', description: 'customer email' })
  @Column({ unique: true })
  customer_email: string;
  @ApiProperty({ example: 'Silver', description: 'Tier Name' })
  @Column({ type: 'varchar' })
  current_tier_name: string;
  @ApiProperty({ example: 2, description: 'Tier Level' })
  @Column({ type: 'int' })
  current_tier: number;
  @ApiProperty({ example: 2, description: 'Next Tier Level' })
  @Column({ type: 'int' })
  next_tier: number;
  @ApiProperty({ example: 1, description: 'Last Tier Level' })
  @Column({ type: 'int' })
  previous_tier: number;
  @ApiProperty({
    example: false,
    description: 'is point has been send to customer',
  })
  @Column({ type: 'boolean', default: false })
  is_point_send: boolean;
  @ApiProperty({ example: 7, description: 'Recuring Transaction' })
  @Column({ type: 'int' })
  reccuring_transaction: number;
  @ApiProperty({ example: '2020-10-10 10:10:10', description: 'Created At' })
  @Column({ type: 'timestamp' })
  created_at: Date;
  @ApiProperty({ example: '2020-10-10 10:10:10', description: 'Updated At' })
  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;
  @ApiProperty({ example: '2020-10-10 10:10:10', description: 'Deleted At' })
  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date;
}

export class LoyaltyHistory {
  @ApiProperty({
    example: '5f9f1c5b-7b1e-4b5c-8c1c-8c1c8c1c8c1c',
    description: 'Loyalty ID',
  })
  id: string;
  @ApiProperty({
    example: '5f9f1c5b-7b1e-4b5c-8c1c-8c1c8c1cqwe2',
    description: 'Customer ID',
  })
  loyalty_id: string;
  @ApiProperty({ example: 'john.doe@test.com', description: 'customer email' })
  customer_email: string;
  @ApiProperty({ example: 'Gold', description: 'Tier Name' })
  current_tier_name: string;
  @ApiProperty({ example: 2, description: 'Tier Level' })
  current_tier: number;
  @ApiProperty({ example: 2, description: 'Next Tier Level' })
  next_tier: number;
  @ApiProperty({ example: 1, description: 'Last Tier Level' })
  previous_tier: number;
  @ApiProperty({ example: 100, description: 'Loyalty Point' })
  loyalty_point: number;
  @ApiProperty({ example: '2020-10-10 10:10:10', description: 'Created At' })
  created_at: Date;
  @ApiProperty({ example: '2020-10-10 10:10:10', description: 'Updated At' })
  updated_at: Date;
  @ApiProperty({ example: '2020-10-10 10:10:10', description: 'Deleted At' })
  deleted_at: Date;
}

@Entity()
export class LoyaltyRules {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'int' })
  loyalty_tier: number;
  @Column({ type: 'int' })
  min_transaction_applied: number;
  @Column({ type: 'decimal' })
  loyalty_point: number;
  @Column({ type: 'timestamp' })
  created_at: Date;
  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;
  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date;
}
