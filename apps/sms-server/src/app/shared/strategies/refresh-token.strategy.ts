import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { Request as Req } from 'express';
import { Strategy } from 'passport-jwt';

import { cookieExtractor } from '../../domain/utils/cookies.extractor';
import type { JwtPayload, JwtPayloadWithRt } from '../../domain/model/auth.model';
import { jwtConstants } from '../../domain/constants/auth.constants';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: (request: Req) => cookieExtractor(request, 'rt'),
      secretOrKey: jwtConstants.secret,
      passReqToCallback: true,
    });
  }

  public validate(req: Req, payload: JwtPayload): JwtPayloadWithRt {
    const refreshToken = cookieExtractor(req, 'rt')?.replace('Bearer', '').trim();

    if (!refreshToken) {
      throw new ForbiddenException('Refresh token malformed');
    }

    return {
      ...payload,
      refreshToken,
    };
  }
}
