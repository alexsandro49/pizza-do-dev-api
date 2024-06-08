import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  authUser(): string {
    return 'This action authenticates user on login';
  }

  createAccount(userData: {}): string {
    return "This action creates the user's account";
  }

  recoverPassword(id: number): string {
    return "This action recover the user's password";
  }
}
