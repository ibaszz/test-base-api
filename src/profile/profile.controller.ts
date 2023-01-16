import { Controller, Get, UseGuards, Version, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}
  @Version('1')
  @UseGuards(JwtAuthGuard)
  @ApiTags('Get Profile')
  @Get()
  @ApiBearerAuth()
  async profile(@Request() req) {
    return this.profileService.getProfile(req.user);
  }
}
