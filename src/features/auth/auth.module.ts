import { Module } from '@nestjs/common';
import { AuthService } from './servers/auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { TokenService } from './servers/token.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt_strategy';


@Module({
  imports:[UserModule, ConfigModule.forRoot({isGlobal:true}),JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),],
  controllers: [AuthController],
  providers: [AuthService,TokenService,JwtStrategy],
})
export class AuthModule {}
