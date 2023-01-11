import {
  Body,
  Controller,
  InternalServerErrorException,
  Logger,
  Patch,
  Post,
} from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SuccessCreateResponse } from './dto/base-response.dto';
import { CreateLoyaltyDto } from './dto/create-loyalty.dto';
import { GetLoyaltyRulesDto } from './dto/get-loyalty.dto';
import { UpdateLoyaltyDto } from './dto/update-loyalty.dto';
import { LoyaltyService } from './loyalty.service';

@ApiBearerAuth()
@ApiTags('Loyalty')
@Controller()
export class LoyaltyController {
  constructor(private readonly loyaltyService: LoyaltyService) {}
  private readonly logger = new Logger('Loyalty Service');
  @Post()
  @ApiOperation({ summary: 'Create a new loyalty' })
  @ApiCreatedResponse({ type: SuccessCreateResponse })
  async create(@Body() createLoyaltyDto: CreateLoyaltyDto) {
    const result = await this.loyaltyService.create(createLoyaltyDto);

    return new SuccessCreateResponse(
      201,
      'Loyalty created successfully',
      result,
    );
  }

  @Patch()
  @ApiOperation({ summary: 'Update a loyalty' })
  @ApiCreatedResponse({
    description: 'Loyalty updated',
    type: SuccessCreateResponse,
  })
  async update(@Body() updateLoyaltyDto: UpdateLoyaltyDto) {
    const result = await this.loyaltyService.update(updateLoyaltyDto);
    return new SuccessCreateResponse(
      201,
      'Loyalty updated successfully',
      result,
    );
  }

  // Message Queue
  @MessagePattern('check-tier-reward')
  async checkTierReward(@Payload() data: any) {
    try {
      this.logger.log(data);
      const result = await this.loyaltyService.getByCustomerEmail(data);
      this.logger.log(
        `Message [check-tier-reward] successfully send ${JSON.stringify(
          result,
        )}`,
      );
      return result;
    } catch (error) {
      this.logger.error(`Message [check-tier-reward] failed send ${error}`);
      throw new InternalServerErrorException(error);
    }
  }

  @MessagePattern('get-loyalty-point-by-transaction-applied')
  async getAllLoyaltyRules(@Payload() data: GetLoyaltyRulesDto) {
    try {
      const result = await this.loyaltyService.getAllLoyaltyRules(data);
      this.logger.log(
        `Message [get-loyalty-point-by-transaction-applied] successfully send ${result}`,
      );
      return result;
    } catch (error) {
      this.logger.error(
        `Message [get-loyalty-point-by-transaction-applied] failed send ${error}`,
      );
      throw new InternalServerErrorException(error);
    }
  }

  @EventPattern('update-tier-reward')
  async updateTierReward(@Payload() data: any) {
    try {
      const result = await this.loyaltyService.update(data);
      this.logger.log(
        `Message [update-tier-reward] successfully send ${JSON.stringify(
          result,
        )}`,
      );
      return result;
    } catch (error) {
      this.logger.error(
        `Message [update-tier-reward] failed send ${JSON.stringify(error)}`,
      );
      throw new InternalServerErrorException(error);
    }
  }
}
