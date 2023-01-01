import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  ErrorResponseBadRequest,
  ErrorResponseForbidden,
  ErrorResponseInternalServerError,
  ErrorResponseUnauthorized,
} from './dto/base-error-response.dto';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Transaction, TransactionHistory } from './entities/transaction.entity';
import { TransactionService } from './transaction.service';
@ApiBearerAuth()
@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiOperation({ summary: 'Create Transaction' })
  @ApiBody({ type: Transaction })
  @ApiForbiddenResponse({
    description: 'Forbidden.',
    type: ErrorResponseForbidden,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
    type: ErrorResponseUnauthorized,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
    type: ErrorResponseBadRequest,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    type: ErrorResponseInternalServerError,
  })
  create(@Body() createTransactionDto: CreateTransactionDto): Transaction {
    return this.transactionService.create(createTransactionDto);
  }

  @Get('history')
  @ApiOperation({ summary: 'Get Transaction History' })
  @ApiQuery({
    name: 'start_date',
    required: true,
    type: 'string',
    description: 'Start Date',
  })
  @ApiQuery({
    name: 'end_date',
    required: true,
    type: 'string',
    description: 'End Date',
  })
  @ApiQuery({
    name: 'partner_id',
    required: true,
    type: 'string',
    description: 'Partner ID',
  })
  findByDateAndPartnerID(
    @Query('start_date') start_date: Date,
    @Query('end_date') end_date: Date,
    @Query('partner_id') partner_id: string,
  ): TransactionHistory[] {
    return this.transactionService.findByDateAndPartnerID(
      start_date,
      end_date,
      partner_id,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.update(+id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(+id);
  }
}
