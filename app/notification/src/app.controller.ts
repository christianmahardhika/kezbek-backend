import { Controller, Logger } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private logger = new Logger('Notification Controller');

  @EventPattern('email-notification')
  async handleEmailNotification(data: any) {
    try {
      this.appService.sendEmail(data);
    } catch (error) {
      this.logger.error(`Error sending email: ${error}`);
    }
  }
}
