import { Controller, Get, UseGuards, Version, Request } from '@nestjs/common';
import { Query, Req } from '@nestjs/common/decorators';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { BaseApiRequest } from 'src/Common/request/BaseApiRequest';
import BaseResponse from 'src/Common/response/BaseResponse';
import { ProfileService } from './profile.service';

@ApiTags('Profile Controller')
@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}
  @Version('1')
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiBearerAuth()
  async profile(
    @Request() req,
    @Query('transactionId') transactionId: string,
    @Query('channel') channel: string,
  ) {
    try {
      const profile = await this.profileService.getProfile(req.user);
      return BaseResponse.createSuccessResponse(
        new BaseApiRequest(transactionId, channel),
        profile,
      );
    } catch (e) {}
  }
}
