import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  authUser(): string {
    return this.authService.authUser();
  }

  @Post()
  createAccount(@Body() userData: {}): string {
    return this.authService.createAccount(userData);
  }

  @Post()
  recoverPassword(@Param('id', ParseIntPipe) id: number): string {
    return this.authService.recoverPassword(id);
  }
}
