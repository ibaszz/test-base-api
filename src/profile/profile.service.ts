import { Injectable } from '@nestjs/common';
import { User, UsersService } from 'src/users/users.service';

@Injectable()
export class ProfileService {
  constructor(private userService: UsersService) {}

  async getProfile(req: any): Promise<User> {
    const { id, googleId, ...user } = await this.userService.findOne(
      req.username,
    );
    return user;
  }
}
