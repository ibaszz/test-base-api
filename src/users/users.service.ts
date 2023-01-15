import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/PrismaService';

export type User = any;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string): Promise<User | undefined> {
    console.log(email);
    return this.prisma.users.findUnique({ where: { email: email } });
  }
}
