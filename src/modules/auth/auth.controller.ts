import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './schema/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  authUser(): string {
    return this.authService.authUser();
  }

  @Post('create')
  async createAccount(
    @Body() userData: { email: string; password_hash: string },
  ): Promise<User> {
    return this.authService.createUser(userData);
  }

  @Post()
  recoverPassword(@Param('id', ParseIntPipe) id: number): string {
    return this.authService.recoverPassword(id);
  }
}
