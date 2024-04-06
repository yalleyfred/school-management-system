import {
  Body,
  Controller,
  HttpStatus,
  Post,
  HttpCode,
  Response,
} from '@nestjs/common';
import { AuthService } from '../application/auth.service';
import { AuthDto, NewUserDTO } from '../../../domain/dtos/auth.dto';
import { Response as Res } from 'express';
import { Public } from '../../../shared/decorators/public.decorator';
import type { CookieOptions } from 'express';

@Controller('auth')
export class AuthController {
  private readonly cookieOptions: CookieOptions;

  constructor(private authService: AuthService) {
    this.cookieOptions = { secure: true, httpOnly: true };

  }

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: NewUserDTO): Promise<any> {
    return this.authService.signUp(dto);
  }

  @Public()
  @Post('signIn')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() dto: AuthDto, @Response() response: Res): Promise<any> {
    const user = await this.authService.SignIn(dto);

    return response
      .cookie('at', user.tokens.accessToken, this.cookieOptions)
      .cookie('rt', user.tokens.refreshToken, this.cookieOptions)
      .json({ user: user.user });
  }
}