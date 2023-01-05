import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
  @ApiProperty({
    example: '5f9f1c5b-7b1e-4b5c-8c1c-8c1c8c1c8c1c',
    description: 'Transaction ID',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiProperty({
    example: 'john.doe@test.com',
    description: 'Customer Email',
  })
  @Column({ type: 'varchar' })
  customer_email: string;
  @ApiProperty({
    example: '90133023-1b6d-4c4d-9379-64263283dcbb',
    description: 'Partner ID',
  })
  @Column({ type: 'uuid' })
  partner_id: string;
  @ApiProperty({ example: true, description: 'Is Cashback Applied' })
  @Column({ type: 'boolean', default: false })
  is_cashback_applied: boolean;
  @ApiProperty({ example: 1000, description: 'Cashback Amount' })
  @Column({ type: 'decimal', nullable: true })
  cashback_amount: number;
  @ApiProperty({ example: 100000, description: 'Transaction Amount' })
  @Column({ type: 'decimal' })
  transaction_amount: number;
  @ApiProperty({ example: 1, description: 'Transaction Quantity' })
  @Column({ type: 'int' })
  transaction_quantity: number;
  @ApiProperty({ example: 1000, description: 'Tier Reward Amount' })
  @Column({ type: 'decimal', nullable: true })
  tier_reward_amount: number;
  @ApiProperty({ example: 1, description: 'Tier' })
  @Column({ type: 'int' })
  tier: number;
  @ApiProperty({ example: 1000, description: 'Total Reward Amount' })
  @Column({ type: 'decimal' })
  total_reward_amount: number;
  @ApiProperty({ example: new Date(), description: 'Created At' })
  @Column({ type: 'timestamp' })
  created_at: Date;
  @ApiProperty({ example: new Date(), description: 'Updated At' })
  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;
  @ApiProperty({ example: new Date(), description: 'Deleted At' })
  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date;
}
