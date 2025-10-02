import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './servers/auth.service';
import { RegisterDto } from './dto/auth_register.dto';
import { LoginDto } from './dto/auth_login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto:RegisterDto){
    return await this.authService.register(registerDto)
  }

  @Post('login')
  async login(@Body() loginDto:LoginDto){
    return await this.authService.login(loginDto)
  }

}
