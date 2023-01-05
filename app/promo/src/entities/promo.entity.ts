import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Promo {
  @ApiProperty({
    example: '5389dc4f-4fda-4245-8e13-c80230f78afa',
    description: 'The uuid of the Promo',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiProperty({
    example: '7096dabb-8cc2-4e3b-bf63-127ea2678d48',
    description: 'The uuid of the Partner',
  })
  @Column({ type: 'uuid' })
  partner_id: string;
  @ApiProperty({
    example: 'true',
    description: 'The status of the Promo',
  })
  @Column({ type: 'boolean', default: true })
  is_active: boolean;
  @ApiProperty({
    example: 1,
    description: 'The minimum quantity of the Transaction',
  })
  @Column({ type: 'int' })
  min_quantity: number;
  @ApiProperty({
    example: 1000,
    description: 'The minimum transaction amount',
  })
  @Column({ type: 'decimal' })
  min_transaction_amount: number;
  @ApiProperty({
    example: 10000,
    description: 'The maximum transaction amount',
  })
  @Column({ type: 'decimal' })
  max_transaction_amount: number;
  @ApiProperty({
    example: 1.5,
    description: 'The cashback percentage',
  })
  @Column({ type: 'decimal' })
  cashback_percentage: number;
  @ApiProperty({
    example: '2021-01-01 00:00:00',
    description: 'The start date of the Promo',
  })
  @Column({ type: 'timestamp' })
  promo_start_date: Date;
  @ApiProperty({
    example: '2021-01-02 00:00:00',
    description: 'The end date of the Promo',
  })
  @Column({ type: 'timestamp' })
  promo_end_date: Date;
  @ApiProperty({
    example: '2021-01-01 00:00:00',
    description: 'The created date of the Promo',
  })
  @Column({ type: 'timestamp' })
  created_at: Date;
  @ApiProperty({
    example: '2021-01-01 00:00:00',
    description: 'The updated date of the Promo',
  })
  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;
  @ApiProperty({
    example: '2021-01-01 00:00:00',
    description: 'The deleted date of the Promo',
  })
  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date;
}
