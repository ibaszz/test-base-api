import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(username: string) {
    const user = await this.usersService.findOne(username);
    const payload = { username: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
