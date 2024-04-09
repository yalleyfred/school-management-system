import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { Request as Req } from 'express';
import { Strategy } from 'passport-jwt';

import { cookieExtractor } from '../../domain/utils/cookies.extractor';
import type { JwtPayload } from '../../domain/model/auth.model';
import { jwtConstants } from '../../domain/constants/auth.constants';

@Injectable()
export class AuthTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: (request: Req) => cookieExtractor(request, 'at'),
      secretOrKey: jwtConstants.secret,
    });
  }

  public validate(payload: JwtPayload): JwtPayload {
    return payload;
  }
}
