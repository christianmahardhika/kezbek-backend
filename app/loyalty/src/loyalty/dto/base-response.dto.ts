import { ApiProperty } from '@nestjs/swagger';
import { Loyalty } from '../entities/loyalty.entity';

export class BaseResponse {
  constructor(status: number, message: string, data: any) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
  @ApiProperty({
    example: '200',
    description: 'The status code of the response',
  })
  status: number;
  @ApiProperty({
    example: 'OK',
    description: 'The status message of the response',
  })
  message: string;
  @ApiProperty({
    example: 'This is a sample response',
    description: 'The data of the response',
  })
  data: any;
}

export class SuccessCreateResponse extends BaseResponse {
  @ApiProperty({
    example: '201',
    description: 'The status code of the response',
  })
  status: number;
  @ApiProperty({
    example: 'Created',
    description: 'The status message of the response',
  })
  message: string;
  @ApiProperty({
    example: 'This is a sample response',
    description: 'The data of the response',
  })
  data: Loyalty;
}

export class SuccessUpdateResponse extends BaseResponse {
  @ApiProperty({
    example: '201',
    description: 'The status code of the response',
  })
  status: number;
  @ApiProperty({
    example: 'OK',
    description: 'The status message of the response',
  })
  message: string;
  @ApiProperty({
    example: 'This is a sample response',
    description: 'The data of the response',
  })
  data: Loyalty;
}

export class SucessGetOneResponse extends BaseResponse {
  @ApiProperty({
    example: '200',
    description: 'The status code of the response',
  })
  status: number;
  @ApiProperty({
    example: 'OK',
    description: 'The status message of the response',
  })
  message: string;
  @ApiProperty({
    example: 'This is a sample response',
    description: 'The data of the response',
  })
  data: Loyalty;
}

export class SuccessGetAllResponse extends BaseResponse {
  @ApiProperty({
    example: '200',
    description: 'The status code of the response',
  })
  status: number;
  @ApiProperty({
    example: 'OK',
    description: 'The status message of the response',
  })
  message: string;
  @ApiProperty({
    example: 'This is a sample response',
    description: 'The data of the response',
  })
  data: Loyalty[];
}
