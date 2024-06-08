import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  createUser(userData: {}): string {
    return 'This action create a user';
  }

  removeUser(id: number): string {
    return 'This action remove a user';
  }

  updateUser(id: number, userDate: {}): string {
    return "This action update a user's data";
  }
}
