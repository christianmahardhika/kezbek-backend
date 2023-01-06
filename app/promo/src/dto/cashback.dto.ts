import { IsDecimal, IsInt, Min } from 'class-validator';

export class CashBackDto {
  @IsInt({ message: 'Transaction quantity must be an integer' })
  @Min(1, { message: 'Transaction quantity must be greater than 0' })
  trans_quantity: number;
  @IsDecimal({ message: 'Transaction amount must be a decimal' })
  @Min(1, { message: 'Transaction amount must be greater than 0' })
  trans_amount: number;
}
