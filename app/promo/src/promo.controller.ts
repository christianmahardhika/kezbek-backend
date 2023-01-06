import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Logger,
  Patch,
  Post,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  ErrorResponseBadRequest,
  ErrorResponseForbidden,
  ErrorResponseInternalServerError,
  ErrorResponseUnauthorized,
} from './dto/base-error-response.dto';
import {
  SuccessCreateResponse,
  SuccessGetAllResponse,
  SuccessUpdateResponse,
} from './dto/base-response.dto';
import { CashBackDto } from './dto/cashback.dto';
import { CreatePromoDto } from './dto/create-promo.dto';
import { UpdatePromoDto } from './dto/update-promo.dto';
import { PromoService } from './promo.service';

@ApiBearerAuth()
@ApiTags('Promo')
@Controller()
export class PromoController {
  constructor(private readonly promoService: PromoService) {}

  private readonly logger = new Logger('Promo Service');

  @Post()
  @ApiOperation({ summary: 'Create a new promo' })
  @ApiBody({ type: CreatePromoDto })
  @ApiCreatedResponse({ type: SuccessCreateResponse })
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
  async create(@Body() createPromoDto: CreatePromoDto) {
    const result = await this.promoService.create(createPromoDto);
    return new SuccessCreateResponse(201, 'Promo created successfully', result);
  }

  @Get()
  @ApiOperation({ summary: 'Get list promo' })
  @ApiOkResponse({ type: SuccessGetAllResponse })
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
  async findAll() {
    const result = await this.promoService.findAll();
    return new SuccessGetAllResponse(
      200,
      'Promo retrieved successfully',
      result,
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a promo' })
  @ApiBody({ type: SuccessUpdateResponse })
  @ApiCreatedResponse({ type: UpdatePromoDto })
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
  async update(@Body() updatePromoDto: UpdatePromoDto) {
    const result = await this.promoService.update(updatePromoDto);
    return new SuccessCreateResponse(
      201,
      `Success update new record id ${result.id}`,
      result,
    );
  }

  // message queue
  @MessagePattern('check-cashback-promo')
  async checkCashbackPromo(@Payload() data: CashBackDto) {
    try {
      const result = await this.promoService.getCashBackPercentage(
        data.trans_quantity,
        data.trans_amount,
      );
      this.logger.log(
        `Message [check-cashback-promo] successfully send ${JSON.stringify(
          result,
        )}`,
      );
      return result;
    } catch (error) {
      this.logger.error(`Message [check-cashback-promo] failed send ${error}`);
      throw new InternalServerErrorException(error);
    }
  }
}
