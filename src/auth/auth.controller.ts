import { Body, Controller, Post, Version } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginRequestDto, LoginRequestV2Dto } from './request';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Version('1')
  @ApiBody({ type: LoginRequestDto })
  @ApiTags('Login V1')
  @Post('login')
  async login(@Body() loginReq: LoginRequestDto) {
    return this.authService.login(loginReq.email);
  }

  @Version('2')
  @ApiTags('Login V2')
  @ApiBody({ type: LoginRequestV2Dto })
  @Post('login')
  async loginV2(@Body() loginReq: LoginRequestV2Dto) {
    return {
      version: 2,
      ...(await this.authService.login(loginReq.email)),
    };
  }
}
