
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

interface JwtPayload {
  sub: string;
  role: string;
  iat?: number;
  exp?: number;
}

@Injectable()
export class WsJwtGuard implements CanActivate {
  private readonly logger = new Logger(WsJwtGuard.name);

  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client: Socket = context.switchToWs().getClient<Socket>();

    const authToken = client.handshake.auth?.token;

    const authorization =
      client.handshake.headers.authorization;

    const bearerToken =
      typeof authorization === 'string' &&
      authorization.startsWith('Bearer ')
        ? authorization.slice(7)
        : undefined;

    const token =
      typeof authToken === 'string' && authToken.length > 0
        ? authToken
        : bearerToken;

    if (!token) {
      this.logger.warn('WebSocket connection rejected: Missing token');

      throw new UnauthorizedException(
        'Token not found in websocket connection',
      );
    }

    try {
      const payload =
        await this.jwtService.verifyAsync<JwtPayload>(token);

      if (
        typeof payload.sub !== 'string' ||
        payload.sub.length === 0 ||
        typeof payload.role !== 'string'
      ) {
        throw new UnauthorizedException('Invalid token payload');
      }

      client.data.user = payload;

      this.logger.log(`WebSocket authenticated: ${payload.sub}`);

      return true;
    } catch (error) {
      this.logger.warn('WebSocket connection rejected: Invalid token');

      throw new UnauthorizedException('Invalid websocket token');
    }
  }
}
