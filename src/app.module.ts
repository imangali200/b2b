import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './features/auth/auth.module';
import { UserEntity } from './core/db/entities/user.entity';
import { UserModule } from './features/user/user.module';
import { TokenService } from './features/auth/servers/token.service';
import { BaseService } from './core/services/base.service';
import { JwtModule } from '@nestjs/jwt';
import { getTypeOrmConfig } from './core/config/typeORM.config';
import { ProfileModule } from './features/profile/profile.module';



@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getTypeOrmConfig,
      inject: [ConfigService],
    }),

    AuthModule,
    UserModule,


    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    ProfileModule,
  ],
  controllers: [],
  providers: [
    TokenService,
  ],
})
export class AppModule {}
