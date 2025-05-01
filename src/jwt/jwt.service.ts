import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtCustomService {
  constructor(private readonly jwtService: JwtService) {}

  signToken<T extends object>(payload: T, expiresIn: string | number = '1h'): string {
    return this.jwtService.sign(payload, { expiresIn });
  }
  
  verifyToken<T = any>(token: string): T {
    return this.jwtService.verify(token) as T;
  }

  decodeToken<T = any>(token: string): T | null {
    return this.jwtService.decode(token) as T | null;
  }
}
