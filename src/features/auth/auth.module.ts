import { Module } from '@nestjs/common';
import { AuthService } from './servers/auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { TokenService } from './servers/token.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports:[UserModule,    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'), // .env ішіндегі JWT_SECRET
        signOptions: { expiresIn: '1h' }, // мысалы 1 сағатқа жарамды
      }),
    }),],
  controllers: [AuthController],
  providers: [AuthService,TokenService],
})
export class AuthModule {}
