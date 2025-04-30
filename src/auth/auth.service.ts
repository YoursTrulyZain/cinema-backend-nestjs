import { Inject, Injectable } from '@nestjs/common';
import { IAuthRepository } from './interfaces/auth.repository.interface';
import { JwtCustomService } from 'src/jwt/jwt.service';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        @Inject("IAuthRepository")
        private readonly authRepository:IAuthRepository,
        private readonly jwtService:JwtCustomService) 
        {}

    async validateUser(email:string, password:string) {
        return this.authRepository.validateUser(email, password);
    }

    async login(user: UserEntity): Promise<{ access_token: string }> {
        const payload = { sub: user.id, email: user.email, isAdmin: user.isAdmin };
        const access_token = this.jwtService.signToken(payload);
        return { access_token };
      }
}
