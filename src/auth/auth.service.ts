import { Inject, Injectable } from '@nestjs/common';
import { IAuthRepository } from './interfaces/auth.repository.interface';
import { JwtCustomService } from 'src/jwt/jwt.service';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';

@Injectable()
export class AuthService {
    constructor(
        @Inject("IAuthRepository")
        private readonly authRepository:IAuthRepository,
        private readonly jwtService:JwtCustomService) 
        {}

    async login(loginDto: LoginDto): Promise<AuthResponseDto> {
        const user = await this.authRepository.validateUser(loginDto.email, loginDto.password);
        const payload = { sub: user.id };
        const accessToken = this.jwtService.signToken(payload);
        return new AuthResponseDto(accessToken);
      }
}   
