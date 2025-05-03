import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtCustomService } from './jwt.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
      JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: '90d' },
        }),
      }),],
    providers: [JwtCustomService],
    exports: [JwtCustomService, JwtModule],
})
export class JwtCustomModule {}
