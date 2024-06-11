import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  async authUser(@Body() userData: CreateUserDto): Promise<User> {
    return await this.authService.authUser(userData);
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
