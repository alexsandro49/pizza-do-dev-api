import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(userData: CreateUserDto): Promise<User> {
    return await this.userModel.create(userData);
  }

  async authUser(userData: CreateUserDto): Promise<User> {
    return await this.userModel.findOne({
      email: userData.email,
      password_hash: userData.password_hash,
    });
  }

  removeUser(id: number): string {
    return 'This action remove a user';
  }

  updateUser(id: number, userDate: {}): string {
    return "This action update a user's data";
  }

  recoverPassword(id: number): string {
    return 'This action recover the user password';
  }
}
