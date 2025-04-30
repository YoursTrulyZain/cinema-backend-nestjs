import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaAuthRepository } from './repositories/prisma.auth.repository';
import { JwtCustomService } from 'src/jwt/jwt.service';

@Module({
  imports: [
    JwtModule.register({
      secret: "secret",
      signOptions: { expiresIn: "1h" },
    }),
    PrismaModule,
  ],
  providers: [AuthService, JwtCustomService,
    {
      provide: "IAuthRepository",
      useClass: PrismaAuthRepository,
    },
  ],
  controllers: [AuthController]
})
export class AuthModule {}
