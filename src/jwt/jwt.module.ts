import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtCustomService } from './jwt.service';

@Module({
    imports: [JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: "1h" },
      }),],
    providers: [JwtCustomService],
    exports: [JwtCustomService],
})
export class JwtCustomModule {}
