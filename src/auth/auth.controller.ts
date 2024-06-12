import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './schema/user.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthUserDto } from './dto/auth-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async authUser(
    @Body(ValidationPipe) authUserDto: AuthUserDto,
  ): Promise<User> {
    return await this.authService.authUser(authUserDto);
  }

  @Post('signup')
  async createAccount(
    @Body(ValidationPipe) authUserDto: AuthUserDto,
  ): Promise<User> {
    return this.authService.createUser(authUserDto);
  }

  @Post()
  recoverPassword(@Body(ValidationPipe) updateUserDto: UpdateUserDto): string {
    return this.authService.updateUser(updateUserDto);
  }
}
