import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as handlebars from 'handlebars';
import * as nodemailer from 'nodemailer';
import { join } from 'path';
import { configuration } from './config/config';
import { EmailParamDto } from './dto/email.dto';

@Injectable()
export class AppService {
  private emailService = nodemailer;
  private logger = new Logger('Notification Service');
  constructor() {}
  // send email with aws ses with template html
  sendEmail(data: EmailParamDto) {
    const transporter = this.emailService.createTransport({
      host: configuration.GetSMTPConfig().host,
      port: configuration.GetSMTPConfig().port,
      secure: configuration.GetSMTPConfig().secure,
      auth: {
        user: configuration.GetSMTPConfig().auth.user,
        pass: configuration.GetSMTPConfig().auth.pass,
      },
    });
    const filePath = join(__dirname, '../src/template/email.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);
    const dataTemplate = {
      amount: data.amount,
      partner_name: data.partner_name,
    };
    const htmlEmail = template(dataTemplate);
    const mailOptions = {
      from: configuration.GetSMTPConfig().from_email,
      to: data.email,
      subject: '[Kezbek] - Congratulations! You have cashback!',
      html: htmlEmail,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        this.logger.error(`Error sending email: ${err}`);
      } else {
        this.logger.log(`Email sent: ${info.response}`);
      }
    });
  }
}
