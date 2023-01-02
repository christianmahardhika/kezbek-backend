import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
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
import {
  SuccessCreateResponse,
  SuccessGetAllResponse,
  SuccessUpdateResponse,
  SucessGetOneResponse,
} from './dto/base-response.dto';
import { CreatePromoDto } from './dto/create-promo.dto';
import { UpdatePromoDto } from './dto/update-promo.dto';
import { PromoService } from './promo.service';

@ApiBearerAuth()
@ApiTags('Promo')
@Controller('promo')
export class PromoController {
  constructor(private readonly promoService: PromoService) {}

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

  @Get('promo_code')
  @ApiOperation({ summary: 'Get promo code' })
  @ApiOkResponse({ type: SucessGetOneResponse })
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
  @ApiQuery({ name: 'promo_code', type: String })
  async getByPromoCode(
    @Query('promo_code', new DefaultValuePipe({})) promo_code: string,
  ) {
    const result = await this.promoService.getPromoCode(promo_code);
    return new SucessGetOneResponse(
      200,
      'Promo code retrieved successfully',
      result,
    );
  }
}
