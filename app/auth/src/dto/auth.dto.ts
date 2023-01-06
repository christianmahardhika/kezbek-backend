export class RegisterDto {
  email: string;
  phoneNumber: string;
  password: string;
  name: string;
}

export class LoginDto {
  username: string;
  password: string;
}

export class ForgotPasswordDto {
  username: string;
}
