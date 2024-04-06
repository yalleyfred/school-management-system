import type { NestMiddleware } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  public use(req: Request, res: Response, next: NextFunction): void {
    const contextString = 'DataService - Request';
    const { method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';

    res.on('finish', () => {
      const { statusCode } = res;

      console.log(`${method} ${statusCode} ${originalUrl} - ${userAgent}`, contextString);
      console.log(`Body: ${JSON.stringify(req.body, null, 2)}`, contextString);
    });

    next();
  }
}