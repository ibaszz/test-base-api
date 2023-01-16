import {
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Body,
  Version,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth-guard';
import { BaseApiRequest } from './Common/request/BaseApiRequest';

class LoginRequestDto extends BaseApiRequest {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

class LoginRequestV2Dto extends BaseApiRequest {
  @IsEmail()
  email: string;
}

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Version('1')
  @Post('auth/login')
  async login(@Body() loginReq: LoginRequestDto) {
    return this.authService.login(loginReq.email);
  }

  @Version('2')
  @Post('auth/login')
  async loginV2(@Body() loginReq: LoginRequestV2Dto) {
    return {
      version: 2,
      ...(await this.authService.login(loginReq.email)),
    };
  }

  @Post('auth/test')
  async test() {
    return { hello: ':' };
  }
}
