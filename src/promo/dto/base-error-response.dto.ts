import { ApiProperty } from '@nestjs/swagger';

export class BaseErrorResponse {
  statusCode: number;
  errorMessage: string;
}

export class ErrorResponseForbidden {
  @ApiProperty({ example: 403, description: 'Forbidden Status Code' })
  statusCode: number;
  @ApiProperty({ example: 'Forbidden', description: 'Forbidden Error Message' })
  errorMessage: string;
}

export class ErrorResponseUnauthorized {
  @ApiProperty({ example: 401, description: 'Unauthorized Status Code' })
  statusCode: number;
  @ApiProperty({
    example: 'Unauthorized',
    description: 'Unauthorized Error Message',
  })
  errorMessage: string;
}

export class ErrorResponseBadRequest {
  @ApiProperty({ example: 400, description: 'Bad Request Status Code' })
  statusCode: number;
  @ApiProperty({
    example: 'Bad Request',
    description: 'Bad Request Error Message',
  })
  errorMessage: string;
}

export class ErrorResponseInternalServerError {
    @ApiProperty({ example: 500, description: 'Internal Server Error Status Code' })
    statusCode: number;
    @ApiProperty({
        example: 'Internal Server Error',
        description: 'Internal Server Error Error Message',
    })
    errorMessage: string;
    }

    
