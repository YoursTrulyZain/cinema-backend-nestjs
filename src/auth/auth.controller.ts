import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
        console.log(loginDto);
        return this.authService.login(loginDto);
    }

   
    @Get('verify')
    @UseGuards(JwtAuthGuard)
    verifyUser(@Request() req) {
        // If the token is valid, `req.user` will be populated by JwtStrategy
        return req.user;
    }
}
