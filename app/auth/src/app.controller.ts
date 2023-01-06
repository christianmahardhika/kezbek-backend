import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ForgotPasswordDto, LoginDto, RegisterDto } from './dto/auth.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  private readonly logger = new Logger('Auth Controller');

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('/login')
  async login(@Body() data: LoginDto) {
    try {
      const token = await this.appService.login(data);
      this.logger.log(`user logged in with token: ${token}`);
      return { token: token };
    } catch (error) {
      this.logger.error(error);
      return { error: error.message };
    }
  }
  @Post('/register')
  async register(@Body() data: RegisterDto) {
    try {
      const result = await this.appService.register(data);
      return { result };
    } catch (error) {
      this.logger.error(error);
      return { error: error.message };
    }
  }
  @Post('/forgot')
  async forgot(@Body() data: ForgotPasswordDto) {
    try {
      const result = await this.appService.forgotPassword(data);
      return { result };
    } catch (error) {
      this.logger.error(error);
      return { error: error.message };
    }
  }
}
