import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthUserDto } from './dto/auth-user.dto';
import { UserByIdDto } from './dto/user-by-id.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(authUserDto: AuthUserDto): Promise<User> {
    const user: User = await this.userModel.findOne({
      email: authUserDto.email,
    });

    if (user !== null) {
      throw new HttpException(
        'This email has already been registered in the system',
        HttpStatus.CONFLICT,
      );
    }

    return await this.userModel.create(authUserDto);
  }

  async authUser(authUserDto: AuthUserDto): Promise<User> {
    const user: User = await this.userModel.findOne({
      email: authUserDto.email,
    });

    if (user === null) {
      throw new HttpException(
        'User not found on the system',
        HttpStatus.NOT_FOUND,
      );
    } else if (user.password !== authUserDto.password) {
      throw new HttpException(
        "User's password is incorrect",
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = await this.userModel.findById(updateUserDto._id);

    if (user === null) {
      throw new HttpException(
        'User not found on the system',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.userModel.findByIdAndUpdate(updateUserDto._id, updateUserDto);

    return await this.userModel.findById(updateUserDto._id);
  }

  async removeUser(userBydIdDto: UserByIdDto): Promise<User> {
    const user: User = await this.userModel.findById(userBydIdDto);

    if (user === null) {
      throw new HttpException(
        'User not found on the system',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.userModel.findByIdAndDelete(userBydIdDto);
  }
}
