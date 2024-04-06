import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '../../user/application/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto, NewUserDTO } from '../../../domain/dtos/auth.dto';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from '../../../domain/constants/auth.constants';
import { AuthTokens, JwtPayload } from '../../../domain/model/auth.model';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserEntity } from '../../../domain/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.hash === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { hash, hastRt, creationDate, modificationDate, ...result } = user;
      return result;
    }
    return null;
  }


  public async signUp(dto: NewUserDTO): Promise<any> {
    const hash = await bcrypt.hash(dto.password, 10);

    const user = await this.userService
      .create({
        email: dto.email,
        password: hash,
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

  async SignIn(authDto: AuthDto) {
    const user = await this.userService.findOne(authDto.email);

    if (!user) throw new ForbiddenException('Acess Denied');

    const passwordMatch = await bcrypt.compare(authDto.hash, user.hash);

    if (!passwordMatch) throw new ForbiddenException('Acess Denied');

    const tokens = await this.getTokens(user.id, user.email);

    await this.updateRtHash(user.id, tokens.refreshToken);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hash, hastRt, creationDate, modificationDate, ...rest } = user;

    return { tokens, user: rest };
  }

  private async updateRtHash(userId: string, rt: string): Promise<void> {
    const hash = await bcrypt.hash(rt, 10);

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
