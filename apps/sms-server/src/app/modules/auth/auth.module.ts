import { Module } from '@nestjs/common';
import { AuthController } from './presentation/auth.controller';
import { AuthService } from './application/auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from '../../domain/constants/auth.constants';
import { UserService } from '../user/application/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../../domain/entities/user.entity';
import { AuthTokenStrategy } from '../../shared/strategies/auth-token.strategy';
import { RefreshTokenStrategy } from '../../shared/strategies/refresh-token.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expireIn },
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtService, AuthTokenStrategy, RefreshTokenStrategy], 
})
export class AuthModule {}
