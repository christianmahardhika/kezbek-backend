import { ApiProperty } from '@nestjs/swagger';

export class FilterTransactionHistoryDto {
  constructor(partner_id: string, start_date: Date, end_date: Date) {
    this.partner_id = partner_id;
    this.start_date = start_date;
    this.end_date = end_date;
  }
  @ApiProperty({ example: '5f9f1c5b-7b1e-4b5c-8c1c-8c1c8c1231c' })
  partner_id: string;
  @ApiProperty({ example: '2020-01-01' })
  start_date: Date;
  @ApiProperty({ example: '2020-01-01' })
  end_date: Date;
}
