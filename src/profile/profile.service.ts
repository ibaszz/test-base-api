import { Injectable } from '@nestjs/common';
import { users } from '@prisma/client';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ProfileService {
  constructor(private userService: UsersService) {}

  async getProfile(req: any): Promise<users> {
    const user = await this.userService.findOne(
      req.username,
    );
    return user;
  }
}
