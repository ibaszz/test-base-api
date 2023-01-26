import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import Cache from 'cache-manager';
import { Logger } from 'src/Common/logger/Logger';
import { PrismaService } from 'src/config/db/PrismaService';

export type User = any;

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private logger: Logger,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    const keys = `users::email::${email}`;
    let user: User = await this.cacheManager.get(keys);
    if (!user) {
      this.logger.log('store to redis', { context: { keys, email } });
      user = await this.prisma.users.findUnique({ where: { email: email } });
      if (!user) {
        throw new UnauthorizedException();
      }
      await this.cacheManager.set(keys, user, 60);
    }

    return user;
  }
}
