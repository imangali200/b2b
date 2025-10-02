import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/core/db/entities/user.entity';

export type PayLoadUser = {
  id: number;
  email: string;
  type: 'access' | 'refresh';
};

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async createToken(user: UserEntity) {
    const payloadAccessToken: PayLoadUser = {
      id: user.id,
      email: user.email,
      type: 'access',
    };
    const payloadRefreshToken: PayLoadUser = {
      id: user.id,
      email: user.email,
      type: 'refresh',
    };

    const accessToken = this.jwtService.sign(payloadAccessToken, {
      expiresIn: '15m',
    });
    const refreshToken = this.jwtService.sign(payloadRefreshToken, {
      expiresIn: '7d',
    });
    return { accessToken, refreshToken };
  }

  async validateAccessToken(token: string) {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
    } catch (error) {
      throw new UnauthorizedException('access token is invalid');
    }
  }
  async validateRefreshToken(token: string) {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
    } catch (error) {
      throw new UnauthorizedException('refresh token is invalid');
    }
  }
  async refreshAccessToken(refreshToken: string) {
    const userData = await this.validateRefreshToken(refreshToken);
    const newAccessToken = await this.jwtService.signAsync(
      { id: userData.id, email: userData.email },
      {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '15m',
      },
    );
    return {accessToken:newAccessToken}
  }
}
