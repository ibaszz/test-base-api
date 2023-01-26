import { Body, Controller, Post, Version } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import BaseResponse from 'src/Common/response/BaseResponse';
import { AuthService } from './auth.service';
import { LoginRequestDto, LoginRequestV2Dto } from './request';

@ApiTags('Auth Controller')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Version('1')
  @ApiBody({ type: LoginRequestDto })
  @Post('login')
  async login(@Body() loginReq: LoginRequestDto) {
    try {
      const accessToken = await this.authService.login(loginReq.email);
      return BaseResponse.createSuccessResponse(loginReq, accessToken);
    } catch (e) {
      return BaseResponse.createFailedResponse(loginReq, null, e.message);
    }
  }

  @Version('2')
  @ApiBody({ type: LoginRequestV2Dto })
  @Post('login')
  async loginV2(@Body() loginReq: LoginRequestV2Dto) {
    try {
      const accessToken = await this.authService.login(loginReq.email);
      return BaseResponse.createSuccessResponse(loginReq, accessToken);
    } catch (e) {
      return BaseResponse.createFailedResponse(loginReq, null, e.message);
    }
  }
}
