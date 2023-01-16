import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
  Version,
  CACHE_MANAGER,
  Inject,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiProperty,
  ApiPropertyOptional,
  ApiTags,
} from '@nestjs/swagger/dist';
import { Cache } from 'cache-manager';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth-guard';
import { BaseApiRequest } from './Common/request/BaseApiRequest';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    @Inject(CACHE_MANAGER) private cache: Cache,
  ) {}

  @Get('test')
  async test() {
    const hello = await this.cache.get('user');
    return { hello };
  }
}
