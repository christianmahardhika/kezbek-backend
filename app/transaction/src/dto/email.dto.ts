import { IsDecimal, IsEmail, IsString } from 'class-validator';

export class EmailParamDto {
  @IsEmail({}, { message: 'Email is not valid' })
  email: string;
  @IsDecimal({ decimal_digits: '0,2' }, { message: 'Amount is not valid' })
  amount: number;
  @IsString({ message: 'Payment provider is not valid' })
  payment_provider: string;
  @IsString({ message: 'Partner name is not valid' })
  partner_name: string;
}
