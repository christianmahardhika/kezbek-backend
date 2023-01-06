import { IsDecimal, IsInt, IsString, Min } from 'class-validator';

export class CashBackDto {
  @IsInt({ message: 'Transaction quantity must be an integer' })
  @Min(1, { message: 'Transaction quantity must be greater than 0' })
  trans_quantity: number;
  @IsDecimal({ message: 'Transaction amount must be a decimal' })
  @Min(1, { message: 'Transaction amount must be greater than 0' })
  trans_amount: number;
}

export class SendCashbackDto {
  @IsString({ message: 'MSISDN must be a string' })
  msisdn: string;
  @IsDecimal({ message: 'Cashback amount must be a decimal' })
  amount: number;
  @IsString({ message: 'Provider must be a string' })
  provider: string;
}

export class CashbackPrecentageDto {
  @IsDecimal({ message: 'Cashback percentage must be a decimal' })
  cashback_percentage: number;
}
