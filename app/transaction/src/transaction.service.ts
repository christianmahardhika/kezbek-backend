import { Injectable, Logger } from '@nestjs/common';
import { SendCashbackDto } from './dto/cashback.dto';
import {
  CreateTransactionDto,
  SubmitTransactionDto,
  SubmitTransactionReturnDto,
} from './dto/create-transaction.dto';
import { EmailParamDto } from './dto/email.dto';
import { LoyaltyDto } from './dto/loyalty.dto';
import { Transaction } from './entities/transaction.entity';
import { TransactionProvider } from './provider/transaction.provider';
import { TransactionRepository } from './repository/transaction.repository';

@Injectable()
export class TransactionService {
  constructor(
    private readonly repository: TransactionRepository,
    private readonly provider: TransactionProvider,
  ) {}

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
        let cashbackPrecentage: number;
        let transactionDto: CreateTransactionDto;
        const formatter = new Intl.NumberFormat('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        await Promise.all([
          this.provider.checkTierByCustomerEmail(
            submitTransactionDto.customer_email,
          ),
          this.provider.getCashback(
            submitTransactionDto.transaction_quantity,
            submitTransactionDto.transaction_amount,
          ),
          this.repository.findLastTransactionByCustomerEmail(
            submitTransactionDto.customer_email,
          ),
        ])
          .then((values) => {
            loyaltyDto = values[0];
            cashbackPrecentage = values[1][0];
            transactionDto = values[2];
            if (!loyaltyDto) {
              loyaltyDto = {
                id: null,
                current_tier_name: 'bronze',
                next_tier: 2,
                previous_tier: 0,
                customer_email: submitTransactionDto.customer_email,
                current_tier: 1,
                is_point_send: false,
                reccuring_transaction: 0,
                created_at: new Date(),
                updated_at: null,
                deleted_at: null,
                upgradeTierReward: null,
                downgradeTierReward: null,
              };
              this.provider.updateLoyalty(loyaltyDto);
            }
            if (!transactionDto) {
              transactionDto = {
                customer_email: submitTransactionDto.customer_email,
                transaction_amount: submitTransactionDto.transaction_amount,
                transaction_quantity: submitTransactionDto.transaction_quantity,
                cashback_amount: 0,
                tier_reward_amount: 0,
                total_reward_amount: 0,
                tier: loyaltyDto.current_tier,
                is_cashback_applied: false,
                partner_id: null,
                created_at: new Date(),
                updated_at: null,
                deleted_at: null,
              };
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
        // calculate cashback amount
        const cashbackAmount: number =
          submitTransactionDto.transaction_amount * (cashbackPrecentage / 100);

        // calculate total cashback amount
        const totalCashbackAmount: number = cashbackAmount + reward;
        const formatedTotalCashbackAmount = parseFloat(
          formatter.format(totalCashbackAmount),
        );

        // upgrade tier if eligible
        loyaltyDto.upgradeTierReward(loyaltyDto);
        // downgrade tier there is no transaction in 1 month
        loyaltyDto.downgradeTierReward(loyaltyDto, transactionDto);
        // async

        // TODO: Implement send email notification to customer (add to queue)

        const emailDto: EmailParamDto = {
          email: submitTransactionDto.customer_email,
          amount: formatedTotalCashbackAmount,
          partner_name: submitTransactionDto.partner_name,
          payment_provider: submitTransactionDto.payment_provider,
        };
        this.provider.sendEmailNotification(emailDto);

        // Implement send cashback to customer
        const cashbackDto: SendCashbackDto = {
          msisdn: submitTransactionDto.customer_msisdn,
          amount: formatedTotalCashbackAmount,
          provider: submitTransactionDto.payment_provider,
        };
        this.provider.sendCashbackToPaymentProvider(cashbackDto);
        // Implement update loyalty tier (send event to loyalty service)
        if (loyaltyDto.reccuring_transaction != 0) {
          loyaltyDto.reccuring_transaction =
            loyaltyDto.reccuring_transaction + 1;
        }

        this.provider.updateLoyalty(loyaltyDto);

        // Implement save transaction to database

        transactionDto = {
          customer_email: submitTransactionDto.customer_email,
          transaction_amount: submitTransactionDto.transaction_amount,
          transaction_quantity: submitTransactionDto.transaction_quantity,
          cashback_amount: cashbackAmount,
          tier_reward_amount: reward,
          total_reward_amount: formatedTotalCashbackAmount,
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

  private async checkReward(loyaltyDto: LoyaltyDto) {
    switch (loyaltyDto.reccuring_transaction) {
      case 3:
        return await this.provider.getReward(
          loyaltyDto.current_tier,
          loyaltyDto.reccuring_transaction,
        );
      case 5:
        return await this.provider.getReward(
          loyaltyDto.current_tier,
          loyaltyDto.reccuring_transaction,
        );
      case 7:
        return await this.provider.getReward(
          loyaltyDto.current_tier,
          loyaltyDto.reccuring_transaction,
        );

      default:
        return 0;
    }
  }
}
