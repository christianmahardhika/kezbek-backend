import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthcheckService {
  StatusOK(): string {
    return 'OK';
  }
}
