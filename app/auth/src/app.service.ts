import { Injectable, Logger } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { configuration } from './config/config';
import { ForgotPasswordDto, LoginDto, RegisterDto } from './dto/auth.dto';

@Injectable()
export class AppService {
  private cognitoUserPool: CognitoUserPool;
  private readonly logger = new Logger('Auth Service');

  constructor() {
    this.cognitoUserPool = new CognitoUserPool({
      UserPoolId: configuration.GetCognitoConfig().userPoolId,
      ClientId: configuration.GetCognitoConfig().clientId,
    });
  }

  getHello(): string {
    return 'Hello World!';
  }
  login(data: LoginDto) {
    return new Promise((resolve, reject) => {
      const { username, password } = data;
      const authenticationDetails = new AuthenticationDetails({
        Username: username,
        Password: password,
      });
      const cognitoUser = new CognitoUser({
        Username: username,
        Pool: this.cognitoUserPool,
      });
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          this.logger.log(result);
          const token = result.getIdToken().getJwtToken();
          resolve(token);
        },
        onFailure: (err) => {
          this.logger.error(err);
          reject(err);
        },
      });
    });
  }
  register(data: RegisterDto) {
    const { email, password, phoneNumber } = data;
    return new Promise((resolve, reject) => {
      return this.cognitoUserPool.signUp(
        email,
        password,
        [
          new CognitoUserAttribute({ Name: 'email', Value: email }),
          new CognitoUserAttribute({
            Name: 'phone_number',
            Value: phoneNumber,
          }),
        ],
        null,
        (err, result) => {
          if (!result) {
            reject(err);
          } else {
            resolve(result);
          }
        },
      );
    });
  }

  forgotPassword(data: ForgotPasswordDto) {
    const { username } = data;
    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Username: username,
        Pool: this.cognitoUserPool,
      });
      cognitoUser.forgotPassword({
        onSuccess: (result) => {
          this.logger.log(result);
          resolve(result);
          return result;
        },
        onFailure: (err) => {
          this.logger.error(err);
          reject(err);
          return err;
        },
      });
    });
  }
}
