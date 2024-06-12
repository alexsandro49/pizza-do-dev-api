import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthUserDto } from './dto/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(authUserDto: AuthUserDto): Promise<User> {
    if ((await this.userExists(authUserDto)) !== null) {
      throw new HttpException(
        'This email has already been registered in the system',
        HttpStatus.CONFLICT,
      );
    }

    return await this.userModel.create(authUserDto);
  }

  async authUser(authUserDto: AuthUserDto): Promise<User> {
    const userExists: User = await this.userExists(authUserDto);

    if (userExists === null) {
      throw new HttpException(
        'User not found on the system',
        HttpStatus.NOT_FOUND,
      );
    }

    return userExists;
  }

  updateUser(updateUserDto: UpdateUserDto): string {
    return "This action update a user's data";
  }

  removeUser(id: number): string {
    return 'This action remove a user';
  }

  private async userExists(authUserDto: AuthUserDto): Promise<User> {
    return await this.userModel.findOne({
      email: authUserDto.email,
      password: authUserDto.password,
    });
  }
}
