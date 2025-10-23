import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from '@nestjs/passport';
import { Auth } from 'src/core/decorators/auth.decorators';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {
  }
  
  @Get()
 @Auth()
  async getProfile(@Req() req){
   return await this.profileService.getProfile(req.user.email)
  }
}