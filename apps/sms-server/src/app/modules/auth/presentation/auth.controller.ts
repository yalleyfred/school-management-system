import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Get,
  HttpCode,
  Response,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../application/auth.service';
import { AuthDto, NewUserDTO } from '../../../domain/dtos/auth.dto';
import { Response as Res } from 'express';
import { Public } from '../../../shared/decorators/public.decorator';
import type { CookieOptions } from 'express';
import { GetCurrentUserId } from '../../../shared/decorators/get-current-user.id.decorator';
import { AuthResponse } from '../../../domain/model/auth.model';
import { RefreshTokenGuard } from '../../../shared/guards';
import { GetCurrentUser } from '../../../shared/decorators/get-current-user.decorator';

@Controller('auth')
export class AuthController {
  private readonly cookieOptions: CookieOptions;

  constructor(private authService: AuthService) {
    this.cookieOptions = { secure: true, httpOnly: true };

  }

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  public async signupLocal(@Body() dto: NewUserDTO): Promise<string> {
    return await this.authService.signUp(dto);
  }

  @Public()
  @Post('signIn')
  @HttpCode(HttpStatus.OK)
  public async signIn(@Body() dto: AuthDto, @Response() response: Res): Promise<Res<unknown, Record<string, unknown>>> {
    const user = await this.authService.SignIn(dto);

    return response
      .cookie('at', user.tokens.accessToken, this.cookieOptions)
      .cookie('rt', user.tokens.refreshToken, this.cookieOptions)
      .json({ user: user.user });
  }

  @Public()
  @Post('delete-account')
  @HttpCode(HttpStatus.OK)
  public async removeUser(@Body() data: { email: string }): Promise<AuthResponse> {
    const result = await this.authService.removeUserByEmail(data.email);
    return result === 1 ? 'user-deleted' : 'failed';
  }

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  public async profile(
    @GetCurrentUserId() userId: string,
    @Response() response: Res
  ): Promise<Res<unknown, Record<string, unknown>>> {
    const result = await this.authService.getUserProfile(userId);

    if (!result) {
      throw new InternalServerErrorException('failed' as AuthResponse);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hash, hastRt, creationDate, modificationDate, ...user } = result;

    return response.json(user);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  public logout(@GetCurrentUserId() userId: string, @Response() response: Res): Res<unknown, Record<string, unknown>> {
    const result = this.authService.logout(userId);

    if (!result) {
      throw new InternalServerErrorException('failed' as AuthResponse);
    }
    response.cookie('at', '', { expires: new Date(0) }).cookie('rt', '', { expires: new Date(0) });
    return response.json(result);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  public async refreshTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
    @Response() response: Res
  ): Promise<Res<unknown, Record<string, unknown>>> {
    const tokens = await this.authService.refreshTokens(userId, refreshToken);

    if (!tokens) {
      throw new InternalServerErrorException('failed' as AuthResponse);
    }
    return response
      .cookie('at', tokens.accessToken, this.cookieOptions)
      .cookie('rt', tokens.refreshToken, this.cookieOptions)
      .json('refreshed' as AuthResponse);
  }
}