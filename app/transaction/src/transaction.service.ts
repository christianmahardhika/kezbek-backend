import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { configuration } from './config/config';
import {
  CashBackDto,
  CashbackPrecentageDto,
  SendCashbackDto,
} from './dto/cashback.dto';
import {
  CreateTransactionDto,
  SubmitTransactionDto,
  SubmitTransactionReturnDto,
} from './dto/create-transaction.dto';
import { LoyaltyDto } from './dto/loyalty.dto';
import { Transaction } from './entities/transaction.entity';
import { TransactionRepository } from './repository/transaction.repository';

@Injectable()
export class TransactionService {
  constructor(
    private readonly repository: TransactionRepository,
    @Inject('PROMO_SERVICE') private readonly promoClient: ClientProxy,
    @Inject('LOYALTY_SERVICE') private readonly loyaltyClient: ClientProxy,
    private readonly httpService: HttpService,
  ) {
    this.promoClient.connect();
    this.loyaltyClient.connect();
  }

  private readonly logger = new Logger('Transaction Service');

  create(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
    return this.repository.createTransaction(createTransactionDto);
  }

  submitTransaction(
    submitTransactionDto: SubmitTransactionDto,
  ): Promise<SubmitTransactionReturnDto> {
    return new Promise(async (resolve, reject) => {
      try {
        // TODO: Implement check if customer is eligible for cashback (message to promo service) and tier reward (message to loyalty service)
        let loyaltyDto: LoyaltyDto;
        let cashbackPrecentageDto: CashbackPrecentageDto;
        let transactionDto: CreateTransactionDto;
        await Promise.all([
          this.checkTierByCustomerEmail(submitTransactionDto.customer_email),
          this.getCashback(
            submitTransactionDto.transaction_quantity,
            submitTransactionDto.transaction_amount,
          ),
          this.repository.findLastTransactionByCustomerEmail(
            submitTransactionDto.customer_email,
          ),
        ])
          .then((values) => {
            loyaltyDto = values[0];
            cashbackPrecentageDto = values[1][0];
            transactionDto = values[2];
            if (!loyaltyDto) {
              const data = new SubmitTransactionReturnDto(
                false,
                'customer is not eligible for tier reward',
                null,
              );
              reject(data);
            }
          })
          .catch((err) => {
            this.logger.error(err);
            const data = new SubmitTransactionReturnDto(
              false,
              'customer is not eligible for cashback',
              null,
            );
            reject(data);
          });

        // Implement calculate total cashback amount, tier reward, and reward (add to queue)
        // - get cashback amount from promo service
        let reward: number;
        await this.checkReward(loyaltyDto).then((value) => {
          reward = value;
        });

        // upgrade tier if eligible
        loyaltyDto = this.upgradeTierReward(loyaltyDto);
        // downgrade tier there is no transaction in 1 month
        loyaltyDto = this.downgradeTierReward(loyaltyDto, transactionDto);
        // async

        // TODO: Implement send email notification to customer (add to queue)

        // Implement send cashback to customer
        const cashbackDto: SendCashbackDto = {
          msisdn: submitTransactionDto.customer_msisdn,
          amount:
            submitTransactionDto.transaction_amount *
            (cashbackPrecentageDto.cashback_percentage / 100),
          provider: submitTransactionDto.payment_provider,
        };
        const { data } = await firstValueFrom(
          this.httpService
            .post(configuration.GetPaymentServiceConfig().host, cashbackDto)
            .pipe(
              catchError((err) => {
                this.logger.error(err);
                // TODO: flag transaction as cashback not applied
                throw 'Error when sending cashback to payment service';
              }),
            ),
        );
        console.log(data);
        // Implement update loyalty tier (send event to loyalty service)
        if (loyaltyDto.reccuring_transaction != 0) {
          loyaltyDto.reccuring_transaction =
            loyaltyDto.reccuring_transaction + 1;
        }

        this.loyaltyClient.emit('update-tier-reward', loyaltyDto);

        // Implement save transaction to database

        transactionDto = {
          customer_email: submitTransactionDto.customer_email,
          transaction_amount: submitTransactionDto.transaction_amount,
          transaction_quantity: submitTransactionDto.transaction_quantity,
          cashback_amount:
            submitTransactionDto.transaction_amount *
            (cashbackPrecentageDto.cashback_percentage / 100),
          tier_reward_amount: reward,
          total_reward_amount:
            submitTransactionDto.transaction_amount *
              (cashbackPrecentageDto.cashback_percentage / 100) +
            reward,
          tier: loyaltyDto.current_tier,
          is_cashback_applied: true,
          partner_id: submitTransactionDto.partner_id,
          created_at: new Date(),
          updated_at: null,
          deleted_at: null,
        };

        this.repository
          .createTransaction(transactionDto)
          .then((value) => {
            const data = new SubmitTransactionReturnDto(
              true,
              'Transaction submitted successfully',
              value.id,
            );
            resolve(data);
          })
          .catch((err) => {
            this.logger.error(err);
            reject(err);
          });
      } catch (error) {
        this.logger.error(error);
        reject(error);
      }
    });
  }

  private upgradeTierReward(loyaltyDto: LoyaltyDto): LoyaltyDto {
    if (loyaltyDto.reccuring_transaction > 7 && loyaltyDto.next_tier > 3) {
      loyaltyDto.current_tier = loyaltyDto.next_tier;
      loyaltyDto.next_tier = loyaltyDto.next_tier + 1;
      loyaltyDto.reccuring_transaction = 1;
      loyaltyDto.updated_at = new Date();
      return loyaltyDto;
    }
    return loyaltyDto;
  }

  private downgradeTierReward(
    loyaltyDto: LoyaltyDto,
    transactionDto: CreateTransactionDto,
  ): LoyaltyDto {
    const diff = Math.abs(
      new Date().getTime() - transactionDto.created_at.getTime(),
    );
    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    if (diffDays > 30) {
      loyaltyDto.current_tier = loyaltyDto.next_tier;
      loyaltyDto.next_tier = loyaltyDto.next_tier - 1;
      loyaltyDto.reccuring_transaction = 1;
      loyaltyDto.updated_at = new Date();
      return loyaltyDto;
    }
    return loyaltyDto;
  }

  private async checkReward(loyaltyDto: LoyaltyDto) {
    switch (loyaltyDto.reccuring_transaction) {
      case 3:
        return await this.getReward(
          loyaltyDto.current_tier,
          loyaltyDto.reccuring_transaction,
        );
      case 5:
        return await this.getReward(
          loyaltyDto.current_tier,
          loyaltyDto.reccuring_transaction,
        );
      case 7:
        return await this.getReward(
          loyaltyDto.current_tier,
          loyaltyDto.reccuring_transaction,
        );

      default:
        return 0;
    }
  }

  private async checkTierByCustomerEmail(email: string) {
    const data = await firstValueFrom(
      this.loyaltyClient.send('check-tier-reward', email),
    );
    return data;
  }

  private async getCashback(trans_quantity: number, trans_amount) {
    const payload: CashBackDto = {
      trans_quantity: trans_quantity,
      trans_amount: trans_amount,
    };
    const data: number = await firstValueFrom(
      this.promoClient.send('check-cashback-promo', payload),
    );
    return data;
  }

  private async getReward(tier: number, reccuring_transaction: number) {
    const payload = {
      tier: tier,
      reccuring_transaction: reccuring_transaction,
    };
    const data: number = await firstValueFrom(
      this.loyaltyClient.send(
        'get-loyalty-point-by-transaction-applied',
        payload,
      ),
    );
    return data;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} transaction`;
  // }

  // update(id: number, updateTransactionDto: UpdateTransactionDto) {
  //   return `This action updates a #${id} transaction`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} transaction`;
  // }
}
