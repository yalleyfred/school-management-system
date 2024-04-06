import { ConflictException, ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserService } from '../../user/application/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto, NewUserDTO } from '../../../domain/dtos/auth.dto';
import { jwtConstants } from '../../../domain/constants/auth.constants';
import { AuthResponse, AuthTokens, JwtPayload } from '../../../domain/model/auth.model';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserEntity } from '../../../domain/entities/user.entity';
import { User } from '../../../domain/model/user.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}


  public async signUp(dto: NewUserDTO): Promise<string> {
    const hash = await this.userService.createHash(dto.hash);

    const user = await this.userService
      .create({
        email: dto.email,
        hash,
        firstName: dto.firstName || '',
        lastName: dto.lastName || '',
        role: dto.role || '',
      })
      .catch((error) => {
        if (error.code === '23505') {
          throw new ConflictException('Email already exists');
        }
        throw error;
      });

    const tokens = await this.getTokens(user.id, user.email);

    await this.updateRtHash(user.id, tokens.refreshToken);

    return 'signed-up';
  }

  public async SignIn(dto: AuthDto): Promise<{tokens:AuthTokens, user: Partial<NewUserDTO>}> {
    const user = await this.userService.findUserByEmail(dto.email);

    if (!user) throw new ForbiddenException('Acess Denied');

    const passwordMatch = await this.userService.compareHashes(dto.hash, user.hash);

    if (!passwordMatch) throw new ForbiddenException('Acess Denied');

    const tokens = await this.getTokens(user.id, user.email);

    await this.updateRtHash(user.id, tokens.refreshToken);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hash, hastRt, creationDate, modificationDate, ...rest } = user;

    return { tokens, user: rest };
  }

  public async getUserProfile(userId: string): Promise<User> {
    return this.userService.findUserById(userId);
  }

  public async removeUserByEmail(email: string): Promise<number> {
    return await this.userService.removeUserByEmail(email);
   
  }

  public async logout(userId: string): Promise<AuthResponse> {
    try {
      await this.userService.updateUser(userId, { hastRt: null });
    } catch (error) {
      throw new InternalServerErrorException('logout failed');
    }
    return 'logged-out';
  }

  public async refreshTokens(userId: string, refreshToken: string): Promise<AuthTokens> {
    const user = await this.userService.findUserById(userId);

    if (!user || !user.hastRt) {
      throw new ForbiddenException('Access Denied');
    }

    const rtMatches = await this.userService.compareHashes(refreshToken, user.hastRt);

    if (!rtMatches) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.getTokens(user.id, user.email);

    await this.userService.updateRtHash(user.id, tokens.refreshToken);

    return tokens;
  }

  private async updateRtHash(userId: string, rt: string): Promise<void> {
    const hash = await this.userService.createHash(rt);

    await this.dataSource
      .createQueryBuilder()
      .update(UserEntity)
      .set({
        hastRt: hash,
      })
      .where('id = :userId', { userId })
      .execute();
  }

  private async getTokens(userId: string, email: string): Promise<AuthTokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: jwtConstants.secret,
        expiresIn: jwtConstants.expireIn,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: jwtConstants.secret,
        expiresIn: jwtConstants.expireIn,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
