import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
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
  SucessGetOneResponse,
} from './dto/base-response.dto';
import { CreateLoyaltyDto } from './dto/create-loyalty.dto';
import { UpdateLoyaltyDto } from './dto/update-loyalty.dto';
import { LoyaltyService } from './loyalty.service';

@ApiBearerAuth()
@ApiTags('Loyalty')
@Controller('loyalty')
export class LoyaltyController {
  constructor(private readonly loyaltyService: LoyaltyService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new loyalty' })
  @ApiCreatedResponse({ type: SuccessCreateResponse })
  create(@Body() createLoyaltyDto: CreateLoyaltyDto) {
    return this.loyaltyService.create(createLoyaltyDto);
  }

  @Patch()
  @ApiOperation({ summary: 'Update a loyalty' })
  @ApiCreatedResponse({
    description: 'Loyalty updated',
    type: SuccessCreateResponse,
  })
  update(@Body() updateLoyaltyDto: UpdateLoyaltyDto) {
    return this.loyaltyService.update(updateLoyaltyDto);
  }

  @Get('customer')
  @ApiOperation({ summary: 'Get loyalty by customer ID' })
  @ApiOkResponse({ description: 'Loyalty found', type: SucessGetOneResponse })
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
  @ApiQuery({ name: 'ID', type: String, required: true })
  getByCustomerID(@Query('ID') id: string) {
    return this.loyaltyService.getByCustomerID(id);
  }
}
