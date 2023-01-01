import {
  Body,
  Controller,
  DefaultValuePipe,
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
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiParam,
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
import { CreatePromoDto } from './dto/create-promo.dto';
import { UpdatePromoDto } from './dto/update-promo.dto';
import { Promo } from './entities/promo.entity';
import { PromoService } from './promo.service';

@ApiBearerAuth()
@ApiTags('Promo')
@Controller('promo')
export class PromoController {
  constructor(private readonly promoService: PromoService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new promo' })
  @ApiBody({ type: CreatePromoDto })
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
  create(@Body() createPromoDto: CreatePromoDto): Promo {
    return this.promoService.create(createPromoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get list promo' })
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
  findAll(): Promo[] {
    return this.promoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a promo' })
  @ApiParam({ name: 'id', type: String })
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
  findOne(@Param('id') id: string): Promo {
    return this.promoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a promo' })
  @ApiBody({ type: UpdatePromoDto })
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
  update(
    @Param('id') id: string,
    @Body() updatePromoDto: UpdatePromoDto,
  ): Promo {
    return this.promoService.update(+id, updatePromoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a promo' })
  @ApiParam({ name: 'id', type: 'string' })
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
  remove(@Param('id') id: string): String {
    return this.promoService.remove(+id);
  }

  @Get('promo_code')
  @ApiOperation({ summary: 'Get promo code' })
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
  getByPromoCode(
    @Query('promo_code', new DefaultValuePipe({})) promo_code: string,
  ): Promo {
    return this.promoService.getPromoCode(promo_code);
  }
}
