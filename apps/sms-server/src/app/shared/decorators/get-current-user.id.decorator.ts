import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import type { JwtPayload } from '../../domain/model/auth.model';

export const GetCurrentUserId = createParamDecorator((_: undefined, context: ExecutionContext): string => {
  const request = context.switchToHttp().getRequest();
  const user = request.user as JwtPayload;

  return user.sub;
});
