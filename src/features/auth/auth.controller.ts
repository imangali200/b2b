import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './servers/auth.service';
import { RegisterDto } from './dto/auth_register.dto';
import { LoginDto } from './dto/auth_login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary:'register',
    description:'return token'
  })
  @Post('register')
  async register(@Body() registerDto:RegisterDto){
    return await this.authService.register(registerDto)
  }

  @ApiOperation({
    summary:"Login",
    description:"this login return access and refresh tokens"
  })
  @Post('login')
  async login(@Body() loginDto:LoginDto){
    return await this.authService.login(loginDto)
  }

}
