import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaAuthRepository } from './repositories/prisma.auth.repository';
import { JwtCustomService } from 'src/jwt/jwt.service';
import { JwtCustomModule } from 'src/jwt/jwt.module';
import { JwtStrategy } from 'src/jwt/jwt.strategy';
@Module({
  imports: [
    JwtCustomModule,
    PrismaModule,
  ],
  providers: [AuthService, JwtCustomService, JwtStrategy,
    {
      provide: "IAuthRepository",
      useClass: PrismaAuthRepository,
    },
  ],
  controllers: [AuthController]
})
export class AuthModule {}
