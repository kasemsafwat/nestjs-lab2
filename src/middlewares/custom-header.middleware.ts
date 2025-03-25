import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class CustomHeaderMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const requestHeaderValue = req.headers['custom-header'] || req.headers['Custom-Header'];
    const expectedHeaderValue = this.configService.get<string>('CUSTOM_HEADER_VALUE');

    if (!requestHeaderValue) {
      throw new UnauthorizedException('Missing custom-header');
    }
    if (requestHeaderValue !== expectedHeaderValue) {
      throw new UnauthorizedException('Invalid custom-header value');
    }

    const bearerToken = req.headers['authorization'];
    if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid Authorization token');
    }

    const token = bearerToken.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Invalid Authorization token format');
    }

    try {
      jwt.verify(token, this.configService.get<string>('JWT_SECRET')!);
    } catch (error) {
      console.error('JWT Verification Error:', error);
      throw new UnauthorizedException('Invalid or expired token');
    }

    next();
  }
}
