import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterDto } from '../dto/auth_register.dto';
import { UserService } from '../../user/user.service';
import bcrypt from 'node_modules/bcryptjs';
import { TokenService } from './token.service';
import { LoginDto } from '../dto/auth_login.dto';
import { use } from 'passport';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}
  async register(registerDto: RegisterDto) {
    const user = await this.userService.findEmail(registerDto.email);
    if (user)
      throw new BadRequestException(
        'Already this email is used,use another email',
      );

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const createUser = await this.userService.createUser({
      ...registerDto,
      password: hashedPassword,
    });

    if (!createUser) throw new BadRequestException('user is not created');

    const tokens = await this.tokenService.createToken(createUser);
    return tokens;
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findEmail(loginDto.email);
    if (!user) throw new NotFoundException("Your email is didn't find");

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) throw new BadRequestException('password in invalid');

    const tokens = await this.tokenService.createToken(user)
    return tokens
  }
}
