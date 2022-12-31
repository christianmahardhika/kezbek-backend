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
import { CreateLoyaltyDto } from './dto/create-loyalty.dto';
import { GetLoyaltyDTO } from './dto/get-loyalty.dto';
import { UpdateLoyaltyDto } from './dto/update-loyalty.dto';
import { LoyaltyService } from './loyalty.service';

@ApiBearerAuth()
@ApiTags('Loyalty')
@Controller('loyalty')
export class LoyaltyController {
  constructor(private readonly loyaltyService: LoyaltyService) {}

  @Post()
  create(@Body() createLoyaltyDto: CreateLoyaltyDto) {
    return this.loyaltyService.create(createLoyaltyDto);
  }

  @Get()
  findAll() {
    return this.loyaltyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loyaltyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoyaltyDto: UpdateLoyaltyDto) {
    return this.loyaltyService.update(+id, updateLoyaltyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loyaltyService.remove(+id);
  }

  @Get('customer')
  @ApiOperation({ summary: 'Get loyalty by customer ID' })
  @ApiOkResponse({ description: 'Loyalty found', type: GetLoyaltyDTO })
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
