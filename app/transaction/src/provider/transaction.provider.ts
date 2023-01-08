import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { CashBackDto, SendCashbackDto } from 'src/dto/cashback.dto';
import { EmailParamDto } from 'src/dto/email.dto';
import { LoyaltyDto } from 'src/dto/loyalty.dto';
import { configuration } from '../config/config';

@Injectable()
export class TransactionProvider {
  constructor(
    @Inject('PROMO_SERVICE') private readonly promoClient: ClientProxy,
    @Inject('LOYALTY_SERVICE') private readonly loyaltyClient: ClientProxy,
    @Inject('NOTIFICATION_SERVICE')
    private readonly notificationClient: ClientProxy,
    private readonly httpService: HttpService,
  ) {
    this.promoClient.connect();
    this.loyaltyClient.connect();
    this.notificationClient.connect();
  }

  private readonly logger = new Logger('Transaction Provider');

  async checkTierByCustomerEmail(email: string): Promise<LoyaltyDto> {
    const data = await firstValueFrom(
      this.loyaltyClient.send('check-tier-reward', email),
    );
    return data;
  }

  async getCashback(trans_quantity: number, trans_amount) {
    const payload: CashBackDto = {
      trans_quantity: trans_quantity,
      trans_amount: trans_amount,
    };
    const data: number = await firstValueFrom(
      this.promoClient.send('check-cashback-promo', payload),
    );
    return data;
  }

  async getReward(tier: number, reccuring_transaction: number) {
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

  updateLoyalty(loyaltyDto: LoyaltyDto) {
    this.loyaltyClient.emit('update-tier-reward', loyaltyDto);
  }

  sendEmailNotification(emailParamDto: EmailParamDto) {
    this.notificationClient.emit('email-notification', emailParamDto);
  }

  sendCashbackToPaymentProvider(cashbackDto: SendCashbackDto) {
    firstValueFrom(
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
  }
}
